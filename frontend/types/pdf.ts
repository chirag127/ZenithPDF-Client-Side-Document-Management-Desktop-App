// PDF-specific types

export interface PDFFile {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
  lastModified?: number;
}

export interface PDFPage {
  pageNumber: number;
  width: number;
  height: number;
  thumbnailUri?: string;
  isSelected?: boolean;
}

export interface PDFDocument {
  file: PDFFile;
  pageCount: number;
  pages: PDFPage[];
  isEncrypted: boolean;
  hasPermissions: boolean;
}

export interface PDFMergeOptions {
  files: PDFFile[];
  outputFileName: string;
}

export interface PDFSplitOptions {
  file: PDFFile;
  ranges: { start: number; end: number }[];
  outputFileNames: string[];
}

export interface PDFExtractOptions {
  file: PDFFile;
  pages: number[];
  outputFileName: string;
}

export interface PDFRemoveOptions {
  file: PDFFile;
  pages: number[];
  outputFileName: string;
}

export interface PDFOrganizeOptions {
  file: PDFFile;
  pageOrder: number[];
  rotations: { [pageNumber: number]: number }; // 0, 90, 180, 270
  outputFileName: string;
}

export interface PDFRotateOptions {
  file: PDFFile;
  pages: number[];
  degrees: 90 | 180 | 270;
  outputFileName: string;
}

export interface PDFAddPageNumbersOptions {
  file: PDFFile;
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  startNumber: number;
  format: string; // e.g., "Page {n}" or "{n} / {total}"
  outputFileName: string;
}

export interface PDFAddWatermarkOptions {
  file: PDFFile;
  text?: string;
  imageUri?: string;
  opacity: number; // 0-1
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  rotation: number;
  pages: number[] | 'all';
  outputFileName: string;
}

export interface PDFCropOptions {
  file: PDFFile;
  cropBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  pages: number[] | 'all';
  outputFileName: string;
}

export interface PDFUnlockOptions {
  file: PDFFile;
  password: string;
  outputFileName: string;
}

export interface PDFProtectOptions {
  file: PDFFile;
  userPassword?: string; // For opening the document
  ownerPassword?: string; // For changing permissions
  permissions: {
    printing: boolean;
    modifying: boolean;
    copying: boolean;
    annotating: boolean;
    fillingForms: boolean;
    contentAccessibility: boolean;
    documentAssembly: boolean;
  };
  outputFileName: string;
}

export interface PDFSignOptions {
  file: PDFFile;
  signatureData: string; // Base64 encoded image or SVG path data
  signatureType: 'drawn' | 'typed';
  position: {
    pageNumber: number;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  outputFileName: string;
}

export interface PDFCompressOptions {
  file: PDFFile;
  quality: 'low' | 'medium' | 'high';
  outputFileName: string;
}

export interface PDFImageConversionOptions {
  files: string[]; // URIs to image files
  pageSize: 'A4' | 'letter' | 'legal' | 'custom';
  orientation: 'portrait' | 'landscape';
  customWidth?: number;
  customHeight?: number;
  outputFileName: string;
}

export interface PDFToImageOptions {
  file: PDFFile;
  pages: number[] | 'all';
  format: 'jpg' | 'png';
  quality: number; // 0-100
  outputFileNames: string[];
}
