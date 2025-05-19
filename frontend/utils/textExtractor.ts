import * as FileSystem from 'expo-file-system';
import { PDFDocument } from 'pdf-lib';
import { PDFFile } from '../types/pdf';

/**
 * Extracts text from a PDF file
 * @param file PDF file to extract text from
 * @param onProgress Optional callback for progress updates
 * @returns Extracted text content
 */
export async function extractTextFromPDF(file: PDFFile, onProgress?: (progress: number) => void): Promise<string> {
  try {
    // Note: pdf-lib doesn't have built-in text extraction capabilities
    // This is a placeholder for now - in a real implementation, we would need to:
    // 1. Use a library that can extract text from PDFs (e.g., pdf.js adapted for React Native)
    // 2. Or use a server-side API for text extraction
    // 3. Or implement OCR for image-based PDFs
    
    // For now, we'll return a placeholder message
    console.warn('Text extraction not fully implemented yet');
    return `This is placeholder text for ${file.name}. In the actual implementation, we would extract the real text content from the PDF.`;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

/**
 * Chunks text into smaller pieces for RAG
 * @param text Text to chunk
 * @param maxChunkSize Maximum size of each chunk (in characters)
 * @param overlapSize Number of characters to overlap between chunks
 * @returns Array of text chunks
 */
export function chunkText(text: string, maxChunkSize: number = 1000, overlapSize: number = 100): string[] {
  if (!text || text.length <= maxChunkSize) {
    return [text];
  }
  
  const chunks: string[] = [];
  let startIndex = 0;
  
  while (startIndex < text.length) {
    // Calculate end index for this chunk
    let endIndex = startIndex + maxChunkSize;
    
    // If we're not at the end of the text, try to find a good break point
    if (endIndex < text.length) {
      // Look for a period, question mark, or exclamation mark followed by a space or newline
      const breakPointRegex = /[.!?][\s\n]/g;
      let matches: RegExpExecArray | null;
      let lastMatch: RegExpExecArray | null = null;
      
      // Set the regex to start searching from a position that would give us a chunk
      // of at least half the desired size but not more than the max size
      const minEndIndex = startIndex + Math.floor(maxChunkSize / 2);
      breakPointRegex.lastIndex = minEndIndex;
      
      // Find the last good break point within our range
      while ((matches = breakPointRegex.exec(text)) !== null) {
        if (matches.index > endIndex) {
          break;
        }
        lastMatch = matches;
      }
      
      // If we found a good break point, use it
      if (lastMatch) {
        endIndex = lastMatch.index + 1; // Include the period/question mark/exclamation mark
      } else {
        // If no good break point, look for a space or newline
        const spaceIndex = text.lastIndexOf(' ', endIndex);
        const newlineIndex = text.lastIndexOf('\n', endIndex);
        const bestIndex = Math.max(spaceIndex, newlineIndex);
        
        if (bestIndex > minEndIndex) {
          endIndex = bestIndex + 1; // Include the space/newline
        }
        // Otherwise, just use the calculated endIndex
      }
    }
    
    // Add this chunk to our list
    chunks.push(text.substring(startIndex, endIndex));
    
    // Move the start index for the next chunk, accounting for overlap
    startIndex = endIndex - overlapSize;
    
    // Make sure we're making progress
    if (startIndex <= 0 || endIndex <= startIndex) {
      startIndex = endIndex;
    }
  }
  
  return chunks;
}

/**
 * Prepares text chunks for RAG with the Gemini API
 * @param file PDF file to process
 * @param maxChunkSize Maximum size of each chunk (in characters)
 * @param overlapSize Number of characters to overlap between chunks
 * @returns Array of text chunks ready for RAG
 */
export async function prepareRAGChunks(
  file: PDFFile, 
  maxChunkSize: number = 1000, 
  overlapSize: number = 100,
  onProgress?: (progress: number) => void
): Promise<string[]> {
  try {
    // Extract text from the PDF
    const text = await extractTextFromPDF(file, onProgress);
    
    // Chunk the text
    const chunks = chunkText(text, maxChunkSize, overlapSize);
    
    // Add metadata to each chunk
    return chunks.map((chunk, index) => {
      return `[Document: ${file.name}, Chunk: ${index + 1}/${chunks.length}]\n${chunk}`;
    });
  } catch (error) {
    console.error('Error preparing RAG chunks:', error);
    throw new Error(`Failed to prepare RAG chunks: ${error.message}`);
  }
}
