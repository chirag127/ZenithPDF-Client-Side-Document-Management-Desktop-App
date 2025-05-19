import * as FileSystem from "expo-file-system";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import {
    PDFFile,
    PDFDocument as PDFDocumentType,
    PDFMergeOptions,
    PDFSplitOptions,
    PDFExtractOptions,
    PDFRemoveOptions,
    PDFOrganizeOptions,
    PDFRotateOptions,
    PDFAddPageNumbersOptions,
    PDFAddWatermarkOptions,
    PDFCropOptions,
    PDFUnlockOptions,
    PDFProtectOptions,
    PDFCompressOptions,
} from "../types/pdf";
import { createTempFilePath, saveFile } from "./fileUtils";

/**
 * Loads a PDF file from a URI
 * @param uri URI of the PDF file
 * @returns ArrayBuffer containing the PDF data
 */
async function loadPDFFromUri(uri: string): Promise<ArrayBuffer> {
    try {
        const fileContent = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return Buffer.from(fileContent, "base64");
    } catch (error) {
        console.error("Error loading PDF from URI:", error);
        throw new Error(`Failed to load PDF: ${error.message}`);
    }
}

/**
 * Saves a PDF document to a file
 * @param pdfDoc PDF document to save
 * @param outputPath Path to save the PDF to
 */
async function savePDFToFile(
    pdfDoc: PDFDocument,
    outputPath: string
): Promise<void> {
    try {
        const pdfBytes = await pdfDoc.save();
        const base64Data = Buffer.from(pdfBytes).toString("base64");
        await FileSystem.writeAsStringAsync(outputPath, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
        });
    } catch (error) {
        console.error("Error saving PDF to file:", error);
        throw new Error(`Failed to save PDF: ${error.message}`);
    }
}

/**
 * Gets information about a PDF document
 * @param file PDF file to get information about
 * @returns PDF document information
 */
export async function getPDFInfo(file: PDFFile): Promise<PDFDocumentType> {
    try {
        const pdfBytes = await loadPDFFromUri(file.uri);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const pageCount = pdfDoc.getPageCount();
        const pages = [];

        for (let i = 0; i < pageCount; i++) {
            const page = pdfDoc.getPage(i);
            pages.push({
                pageNumber: i + 1,
                width: page.getWidth(),
                height: page.getHeight(),
                isSelected: false,
            });
        }

        return {
            file,
            pageCount,
            pages,
            isEncrypted: false, // pdf-lib doesn't provide this info directly
            hasPermissions: false, // pdf-lib doesn't provide this info directly
        };
    } catch (error) {
        console.error("Error getting PDF info:", error);
        throw new Error(`Failed to get PDF info: ${error.message}`);
    }
}

/**
 * Merges multiple PDF files into a single PDF
 * @param options Merge options
 * @returns URI of the merged PDF
 */
export async function mergePDFs(
    options: PDFMergeOptions,
    onProgress?: (progress: number) => void
): Promise<string> {
    try {
        const { files, outputFileName } = options;

        // Create a new PDF document
        const mergedPdf = await PDFDocument.create();

        // Process each file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const pdfBytes = await loadPDFFromUri(file.uri);
            const pdfDoc = await PDFDocument.load(pdfBytes);

            // Copy all pages from the source PDF to the merged PDF
            const copiedPages = await mergedPdf.copyPages(
                pdfDoc,
                pdfDoc.getPageIndices()
            );
            copiedPages.forEach((page) => mergedPdf.addPage(page));

            // Update progress
            if (onProgress) {
                onProgress(((i + 1) / files.length) * 100);
            }
        }

        // Save the merged PDF to a temporary file
        const tempFilePath = createTempFilePath("merged");
        await savePDFToFile(mergedPdf, tempFilePath);

        // Save the file to the app directory
        const savedFilePath = await saveFile(tempFilePath, outputFileName);

        // Clean up the temporary file
        await FileSystem.deleteAsync(tempFilePath, { idempotent: true });

        return savedFilePath;
    } catch (error) {
        console.error("Error merging PDFs:", error);
        throw new Error(`Failed to merge PDFs: ${error.message}`);
    }
}

/**
 * Splits a PDF file into multiple PDFs
 * @param options Split options
 * @returns Array of URIs for the split PDFs
 */
export async function splitPDF(
    options: PDFSplitOptions,
    onProgress?: (progress: number) => void
): Promise<string[]> {
    try {
        const { file, ranges, outputFileNames } = options;

        // Load the source PDF
        const pdfBytes = await loadPDFFromUri(file.uri);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const outputPaths = [];

        // Process each range
        for (let i = 0; i < ranges.length; i++) {
            const range = ranges[i];
            const outputFileName = outputFileNames[i];

            // Create a new PDF document for this range
            const newPdf = await PDFDocument.create();

            // Copy the specified pages
            const pageIndices = [];
            for (let j = range.start - 1; j < range.end; j++) {
                pageIndices.push(j);
            }

            const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
            copiedPages.forEach((page) => newPdf.addPage(page));

            // Save the new PDF to a temporary file
            const tempFilePath = createTempFilePath(`split_${i}`);
            await savePDFToFile(newPdf, tempFilePath);

            // Save the file to the app directory
            const savedFilePath = await saveFile(tempFilePath, outputFileName);
            outputPaths.push(savedFilePath);

            // Clean up the temporary file
            await FileSystem.deleteAsync(tempFilePath, { idempotent: true });

            // Update progress
            if (onProgress) {
                onProgress(((i + 1) / ranges.length) * 100);
            }
        }

        return outputPaths;
    } catch (error) {
        console.error("Error splitting PDF:", error);
        throw new Error(`Failed to split PDF: ${error.message}`);
    }
}

/**
 * Extracts pages from a PDF file
 * @param options Extract options
 * @returns URI of the extracted PDF
 */
export async function extractPDFPages(
    options: PDFExtractOptions,
    onProgress?: (progress: number) => void
): Promise<string> {
    try {
        const { file, pages, outputFileName } = options;

        // Load the source PDF
        const pdfBytes = await loadPDFFromUri(file.uri);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Create a new PDF document
        const newPdf = await PDFDocument.create();

        // Copy the specified pages
        const pageIndices = pages.map((page) => page - 1);
        const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);

        // Add the copied pages to the new PDF
        for (let i = 0; i < copiedPages.length; i++) {
            newPdf.addPage(copiedPages[i]);

            // Update progress
            if (onProgress) {
                onProgress(((i + 1) / pages.length) * 100);
            }
        }

        // Save the new PDF to a temporary file
        const tempFilePath = createTempFilePath("extracted");
        await savePDFToFile(newPdf, tempFilePath);

        // Save the file to the app directory
        const savedFilePath = await saveFile(tempFilePath, outputFileName);

        // Clean up the temporary file
        await FileSystem.deleteAsync(tempFilePath, { idempotent: true });

        return savedFilePath;
    } catch (error) {
        console.error("Error extracting PDF pages:", error);
        throw new Error(`Failed to extract PDF pages: ${error.message}`);
    }
}

/**
 * Removes pages from a PDF file
 * @param options Remove options
 * @returns URI of the modified PDF
 */
export async function removePDFPages(
    options: PDFRemoveOptions,
    onProgress?: (progress: number) => void
): Promise<string> {
    try {
        const { file, pages, outputFileName } = options;

        // Load the source PDF
        const pdfBytes = await loadPDFFromUri(file.uri);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Create a new PDF document
        const newPdf = await PDFDocument.create();

        // Get all page indices except the ones to remove
        const pageCount = pdfDoc.getPageCount();
        const pageIndices = [];
        for (let i = 0; i < pageCount; i++) {
            if (!pages.includes(i + 1)) {
                pageIndices.push(i);
            }
        }

        // Copy the pages to keep
        const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);

        // Add the copied pages to the new PDF
        for (let i = 0; i < copiedPages.length; i++) {
            newPdf.addPage(copiedPages[i]);

            // Update progress
            if (onProgress) {
                onProgress(((i + 1) / copiedPages.length) * 100);
            }
        }

        // Save the new PDF to a temporary file
        const tempFilePath = createTempFilePath("removed");
        await savePDFToFile(newPdf, tempFilePath);

        // Save the file to the app directory
        const savedFilePath = await saveFile(tempFilePath, outputFileName);

        // Clean up the temporary file
        await FileSystem.deleteAsync(tempFilePath, { idempotent: true });

        return savedFilePath;
    } catch (error) {
        console.error("Error removing PDF pages:", error);
        throw new Error(`Failed to remove PDF pages: ${error.message}`);
    }
}

/**
 * Organizes pages in a PDF file (reorder, rotate)
 * @param options Organize options
 * @returns URI of the modified PDF
 */
export async function organizePDFPages(
    options: PDFOrganizeOptions,
    onProgress?: (progress: number) => void
): Promise<string> {
    try {
        const { file, pageOrder, rotations, outputFileName } = options;

        // Load the source PDF
        const pdfBytes = await loadPDFFromUri(file.uri);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Create a new PDF document
        const newPdf = await PDFDocument.create();

        // Copy pages in the specified order
        for (let i = 0; i < pageOrder.length; i++) {
            const pageIndex = pageOrder[i] - 1;
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);

            // Apply rotation if specified
            if (rotations[pageOrder[i]]) {
                copiedPage.setRotation(degrees(rotations[pageOrder[i]]));
            }

            newPdf.addPage(copiedPage);

            // Update progress
            if (onProgress) {
                onProgress(((i + 1) / pageOrder.length) * 100);
            }
        }

        // Save the new PDF to a temporary file
        const tempFilePath = createTempFilePath("organized");
        await savePDFToFile(newPdf, tempFilePath);

        // Save the file to the app directory
        const savedFilePath = await saveFile(tempFilePath, outputFileName);

        // Clean up the temporary file
        await FileSystem.deleteAsync(tempFilePath, { idempotent: true });

        return savedFilePath;
    } catch (error) {
        console.error("Error organizing PDF pages:", error);
        throw new Error(`Failed to organize PDF pages: ${error.message}`);
    }
}

/**
 * Rotates pages in a PDF file
 * @param options Rotate options
 * @returns URI of the modified PDF
 */
export async function rotatePDFPages(
    options: PDFRotateOptions,
    onProgress?: (progress: number) => void
): Promise<string> {
    try {
        const {
            file,
            pages,
            degrees: rotationDegrees,
            outputFileName,
        } = options;

        // Load the source PDF
        const pdfBytes = await loadPDFFromUri(file.uri);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Apply rotations
        for (let i = 0; i < pages.length; i++) {
            const pageIndex = pages[i] - 1;
            const page = pdfDoc.getPage(pageIndex);
            page.setRotation(degrees(rotationDegrees));

            // Update progress
            if (onProgress) {
                onProgress(((i + 1) / pages.length) * 100);
            }
        }

        // Save the modified PDF to a temporary file
        const tempFilePath = createTempFilePath("rotated");
        await savePDFToFile(pdfDoc, tempFilePath);

        // Save the file to the app directory
        const savedFilePath = await saveFile(tempFilePath, outputFileName);

        // Clean up the temporary file
        await FileSystem.deleteAsync(tempFilePath, { idempotent: true });

        return savedFilePath;
    } catch (error) {
        console.error("Error rotating PDF pages:", error);
        throw new Error(`Failed to rotate PDF pages: ${error.message}`);
    }

    /**
     * Adds page numbers to a PDF file
     * @param options Page number options
     * @returns URI of the modified PDF
     */
    export async function addPageNumbersToPDF(
        options: PDFAddPageNumbersOptions,
        onProgress?: (progress: number) => void
    ): Promise<string> {
        try {
            const { file, position, startNumber, format, outputFileName } =
                options;

            // Load the source PDF
            const pdfBytes = await loadPDFFromUri(file.uri);
            const pdfDoc = await PDFDocument.load(pdfBytes);

            // Embed the font
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            // Add page numbers to each page
            const pageCount = pdfDoc.getPageCount();
            for (let i = 0; i < pageCount; i++) {
                const page = pdfDoc.getPage(i);
                const { width, height } = page.getSize();

                // Format the page number
                const pageNumber = startNumber + i;
                let pageText = format.replace("{n}", pageNumber.toString());
                pageText = pageText.replace("{total}", pageCount.toString());

                // Calculate text dimensions
                const textWidth = font.widthOfTextAtSize(pageText, 12);
                const textHeight = 12;

                // Calculate position
                let x = 0;
                let y = 0;

                switch (position) {
                    case "top-left":
                        x = 30;
                        y = height - 30;
                        break;
                    case "top-center":
                        x = (width - textWidth) / 2;
                        y = height - 30;
                        break;
                    case "top-right":
                        x = width - textWidth - 30;
                        y = height - 30;
                        break;
                    case "bottom-left":
                        x = 30;
                        y = 30;
                        break;
                    case "bottom-center":
                        x = (width - textWidth) / 2;
                        y = 30;
                        break;
                    case "bottom-right":
                        x = width - textWidth - 30;
                        y = 30;
                        break;
                }

                // Draw the page number
                page.drawText(pageText, {
                    x,
                    y,
                    size: 12,
                    font,
                    color: rgb(0, 0, 0),
                });

                // Update progress
                if (onProgress) {
                    onProgress(((i + 1) / pageCount) * 100);
                }
            }

            // Save the modified PDF to a temporary file
            const tempFilePath = createTempFilePath("page_numbers");
            await savePDFToFile(pdfDoc, tempFilePath);

            // Save the file to the app directory
            const savedFilePath = await saveFile(tempFilePath, outputFileName);

            // Clean up the temporary file
            await FileSystem.deleteAsync(tempFilePath, { idempotent: true });

            return savedFilePath;
        } catch (error) {
            console.error("Error adding page numbers to PDF:", error);
            throw new Error(
                `Failed to add page numbers to PDF: ${error.message}`
            );
        }
    }

    /**
     * Adds a watermark to a PDF file
     * @param options Watermark options
     * @returns URI of the modified PDF
     */
    export async function addWatermarkToPDF(
        options: PDFAddWatermarkOptions,
        onProgress?: (progress: number) => void
    ): Promise<string> {
        try {
            const {
                file,
                text,
                imageUri,
                opacity,
                position,
                rotation,
                pages,
                outputFileName,
            } = options;

            // Load the source PDF
            const pdfBytes = await loadPDFFromUri(file.uri);
            const pdfDoc = await PDFDocument.load(pdfBytes);

            // Determine which pages to watermark
            const pageCount = pdfDoc.getPageCount();
            const pageIndices =
                pages === "all"
                    ? Array.from({ length: pageCount }, (_, i) => i)
                    : pages.map((p) => p - 1);

            // Add watermark to each specified page
            for (let i = 0; i < pageIndices.length; i++) {
                const pageIndex = pageIndices[i];
                const page = pdfDoc.getPage(pageIndex);
                const { width, height } = page.getSize();

                if (text) {
                    // Text watermark
                    const font = await pdfDoc.embedFont(
                        StandardFonts.HelveticaBold
                    );
                    const textSize = 36;
                    const textWidth = font.widthOfTextAtSize(text, textSize);

                    // Calculate position
                    let x = 0;
                    let y = 0;

                    switch (position) {
                        case "center":
                            x = (width - textWidth) / 2;
                            y = height / 2;
                            break;
                        case "top-left":
                            x = 30;
                            y = height - 30;
                            break;
                        case "top-right":
                            x = width - textWidth - 30;
                            y = height - 30;
                            break;
                        case "bottom-left":
                            x = 30;
                            y = 30;
                            break;
                        case "bottom-right":
                            x = width - textWidth - 30;
                            y = 30;
                            break;
                    }

                    // Draw the watermark text
                    page.drawText(text, {
                        x,
                        y,
                        size: textSize,
                        font,
                        color: rgb(0, 0, 0),
                        opacity,
                        rotate: degrees(rotation),
                    });
                } else if (imageUri) {
                    // Image watermark (implementation would depend on how we handle images)
                    // This would require loading the image, embedding it in the PDF, and drawing it
                    // For now, this is a placeholder
                    console.log("Image watermark not implemented yet");
                }

                // Update progress
                if (onProgress) {
                    onProgress(((i + 1) / pageIndices.length) * 100);
                }
            }

            // Save the modified PDF to a temporary file
            const tempFilePath = createTempFilePath("watermarked");
            await savePDFToFile(pdfDoc, tempFilePath);

            // Save the file to the app directory
            const savedFilePath = await saveFile(tempFilePath, outputFileName);

            // Clean up the temporary file
            await FileSystem.deleteAsync(tempFilePath, { idempotent: true });

            return savedFilePath;
        } catch (error) {
            console.error("Error adding watermark to PDF:", error);
            throw new Error(`Failed to add watermark to PDF: ${error.message}`);
        }
    }
}
