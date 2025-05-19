import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { PDFFile } from '../types/pdf';

// Base directory for app files
export const APP_DIRECTORY = `${FileSystem.documentDirectory}all-pdf-tools/`;
export const TEMP_DIRECTORY = `${APP_DIRECTORY}temp/`;

/**
 * Ensures that the necessary app directories exist
 */
export async function ensureDirectoriesExist(): Promise<void> {
  try {
    const appDirInfo = await FileSystem.getInfoAsync(APP_DIRECTORY);
    if (!appDirInfo.exists) {
      await FileSystem.makeDirectoryAsync(APP_DIRECTORY, { intermediates: true });
    }
    
    const tempDirInfo = await FileSystem.getInfoAsync(TEMP_DIRECTORY);
    if (!tempDirInfo.exists) {
      await FileSystem.makeDirectoryAsync(TEMP_DIRECTORY, { intermediates: true });
    }
  } catch (error) {
    console.error('Error ensuring directories exist:', error);
    throw error;
  }
}

/**
 * Picks a PDF file from the device
 * @returns Selected PDF file or null if cancelled
 */
export async function pickPDFFile(): Promise<PDFFile | null> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });
    
    if (result.canceled) {
      return null;
    }
    
    const file = result.assets[0];
    return {
      uri: file.uri,
      name: file.name,
      size: file.size,
      mimeType: file.mimeType,
      lastModified: file.lastModified,
    };
  } catch (error) {
    console.error('Error picking PDF file:', error);
    throw error;
  }
}

/**
 * Picks multiple PDF files from the device
 * @returns Array of selected PDF files or empty array if cancelled
 */
export async function pickMultiplePDFFiles(): Promise<PDFFile[]> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
      multiple: true,
    });
    
    if (result.canceled) {
      return [];
    }
    
    return result.assets.map(file => ({
      uri: file.uri,
      name: file.name,
      size: file.size,
      mimeType: file.mimeType,
      lastModified: file.lastModified,
    }));
  } catch (error) {
    console.error('Error picking multiple PDF files:', error);
    throw error;
  }
}

/**
 * Picks image files from the device
 * @returns Array of selected image files or empty array if cancelled
 */
export async function pickImageFiles(): Promise<PDFFile[]> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
      copyToCacheDirectory: true,
      multiple: true,
    });
    
    if (result.canceled) {
      return [];
    }
    
    return result.assets.map(file => ({
      uri: file.uri,
      name: file.name,
      size: file.size,
      mimeType: file.mimeType,
      lastModified: file.lastModified,
    }));
  } catch (error) {
    console.error('Error picking image files:', error);
    throw error;
  }
}

/**
 * Saves a file to the app's directory
 * @param fileUri URI of the file to save
 * @param fileName Name to save the file as
 * @returns URI of the saved file
 */
export async function saveFile(fileUri: string, fileName: string): Promise<string> {
  try {
    await ensureDirectoriesExist();
    
    // Ensure the fileName has a .pdf extension
    const normalizedFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    const destinationUri = `${APP_DIRECTORY}${normalizedFileName}`;
    
    // Copy the file to the app directory
    await FileSystem.copyAsync({
      from: fileUri,
      to: destinationUri,
    });
    
    return destinationUri;
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }
}

/**
 * Creates a temporary file path
 * @param prefix Optional prefix for the filename
 * @param extension File extension (default: .pdf)
 * @returns Path to the temporary file
 */
export function createTempFilePath(prefix: string = 'temp', extension: string = '.pdf'): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${TEMP_DIRECTORY}${prefix}_${timestamp}_${randomString}${extension}`;
}

/**
 * Cleans up temporary files
 * @param maxAgeMs Maximum age of files to keep (in milliseconds, default: 1 hour)
 */
export async function cleanupTempFiles(maxAgeMs: number = 60 * 60 * 1000): Promise<void> {
  try {
    const tempDirInfo = await FileSystem.getInfoAsync(TEMP_DIRECTORY);
    if (!tempDirInfo.exists) {
      return;
    }
    
    const files = await FileSystem.readDirectoryAsync(TEMP_DIRECTORY);
    const now = Date.now();
    
    for (const file of files) {
      const filePath = `${TEMP_DIRECTORY}${file}`;
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      
      if (fileInfo.exists && fileInfo.modificationTime) {
        const fileAge = now - fileInfo.modificationTime * 1000;
        if (fileAge > maxAgeMs) {
          await FileSystem.deleteAsync(filePath, { idempotent: true });
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up temp files:', error);
    // Don't throw here, just log the error
  }
}

/**
 * Gets the file size in a human-readable format
 * @param bytes File size in bytes
 * @returns Formatted file size (e.g., "1.5 MB")
 */
export function getFormattedFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
