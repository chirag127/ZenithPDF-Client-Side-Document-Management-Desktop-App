import { Tool } from '../types';

// App information
export const APP_NAME = 'All PDF Tools';
export const APP_VERSION = '1.0.0';

// Default Gemini model
export const DEFAULT_GEMINI_MODEL = 'models/gemini-1.5-pro';

// PDF processing constants
export const MAX_PDF_SIZE_MB = 100;
export const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;
export const DEFAULT_COMPRESSION_QUALITY = 0.8;

// RAG constants
export const DEFAULT_CHUNK_SIZE = 1000;
export const DEFAULT_CHUNK_OVERLAP = 100;

// Tool definitions
export const TOOLS: Tool[] = [
  // Organization tools
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document',
    icon: 'merge',
    category: 'organization',
    route: '/merge-pdf',
    priority: 100,
    isAvailable: true,
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Split a PDF into multiple documents',
    icon: 'split',
    category: 'organization',
    route: '/split-pdf',
    priority: 90,
    isAvailable: true,
  },
  {
    id: 'remove-pages',
    name: 'Remove Pages',
    description: 'Delete specific pages from a PDF document',
    icon: 'delete',
    category: 'organization',
    route: '/remove-pages',
    priority: 80,
    isAvailable: true,
  },
  {
    id: 'extract-pages',
    name: 'Extract Pages',
    description: 'Extract specific pages from a PDF document',
    icon: 'extract',
    category: 'organization',
    route: '/extract-pages',
    priority: 70,
    isAvailable: true,
  },
  {
    id: 'organize-pages',
    name: 'Organize Pages',
    description: 'Rearrange, rotate, and delete pages within a PDF',
    icon: 'organize',
    category: 'organization',
    route: '/organize-pages',
    priority: 60,
    isAvailable: true,
  },
  
  // Conversion tools
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert images (JPG, PNG, WebP, HEIC) to PDF',
    icon: 'image-to-pdf',
    category: 'conversion',
    route: '/image-to-pdf',
    priority: 100,
    isAvailable: true,
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Convert PDF pages to image files (JPG, PNG)',
    icon: 'pdf-to-image',
    category: 'conversion',
    route: '/pdf-to-image',
    priority: 90,
    isAvailable: true,
  },
  {
    id: 'office-to-pdf',
    name: 'Office to PDF',
    description: 'Convert Office documents to PDF',
    icon: 'office-to-pdf',
    category: 'conversion',
    route: '/office-to-pdf',
    priority: 50,
    isAvailable: false, // Not implemented in initial version
  },
  {
    id: 'pdf-to-office',
    name: 'PDF to Office',
    description: 'Convert PDF to Office formats',
    icon: 'pdf-to-office',
    category: 'conversion',
    route: '/pdf-to-office',
    priority: 40,
    isAvailable: false, // Not implemented in initial version
  },
  
  // Editing tools
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    description: 'Rotate pages in a PDF document',
    icon: 'rotate',
    category: 'editing',
    route: '/rotate-pdf',
    priority: 100,
    isAvailable: true,
  },
  {
    id: 'add-page-numbers',
    name: 'Add Page Numbers',
    description: 'Add page numbers to a PDF document',
    icon: 'page-numbers',
    category: 'editing',
    route: '/add-page-numbers',
    priority: 90,
    isAvailable: true,
  },
  {
    id: 'add-watermark',
    name: 'Add Watermark',
    description: 'Add text or image watermarks to a PDF',
    icon: 'watermark',
    category: 'editing',
    route: '/add-watermark',
    priority: 80,
    isAvailable: true,
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    description: 'Adjust page margins or crop pages to a selected area',
    icon: 'crop',
    category: 'editing',
    route: '/crop-pdf',
    priority: 70,
    isAvailable: false, // Not implemented in initial version
  },
  {
    id: 'add-text-image',
    name: 'Add Text/Image',
    description: 'Add text or images to PDF pages',
    icon: 'add-content',
    category: 'editing',
    route: '/add-text-image',
    priority: 60,
    isAvailable: false, // Not implemented in initial version
  },
  
  // Security tools
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    description: 'Remove password protection from a PDF',
    icon: 'unlock',
    category: 'security',
    route: '/unlock-pdf',
    priority: 100,
    isAvailable: true,
  },
  {
    id: 'protect-pdf',
    name: 'Protect PDF',
    description: 'Add password protection to a PDF',
    icon: 'protect',
    category: 'security',
    route: '/protect-pdf',
    priority: 90,
    isAvailable: true,
  },
  {
    id: 'sign-pdf',
    name: 'Sign PDF',
    description: 'Add a signature to a PDF document',
    icon: 'sign',
    category: 'security',
    route: '/sign-pdf',
    priority: 80,
    isAvailable: false, // Not implemented in initial version
  },
  {
    id: 'redact-pdf',
    name: 'Redact PDF',
    description: 'Permanently remove sensitive information from a PDF',
    icon: 'redact',
    category: 'security',
    route: '/redact-pdf',
    priority: 70,
    isAvailable: false, // Not implemented in initial version
  },
  
  // Enhancement tools
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file size by optimizing content',
    icon: 'compress',
    category: 'enhancement',
    route: '/compress-pdf',
    priority: 100,
    isAvailable: true,
  },
  {
    id: 'repair-pdf',
    name: 'Repair PDF',
    description: 'Fix issues in corrupted or damaged PDF files',
    icon: 'repair',
    category: 'enhancement',
    route: '/repair-pdf',
    priority: 90,
    isAvailable: false, // Not implemented in initial version
  },
  {
    id: 'ocr-pdf',
    name: 'OCR PDF',
    description: 'Convert scanned documents to searchable PDFs',
    icon: 'ocr',
    category: 'enhancement',
    route: '/ocr-pdf',
    priority: 80,
    isAvailable: false, // Not implemented in initial version
  },
  {
    id: 'scan-to-pdf',
    name: 'Scan to PDF',
    description: 'Use camera to capture documents as PDF',
    icon: 'scan',
    category: 'enhancement',
    route: '/scan-to-pdf',
    priority: 70,
    isAvailable: false, // Not implemented in initial version
  },
  {
    id: 'compare-pdf',
    name: 'Compare PDF',
    description: 'Highlight differences between two PDF files',
    icon: 'compare',
    category: 'enhancement',
    route: '/compare-pdf',
    priority: 60,
    isAvailable: false, // Not implemented in initial version
  },
  
  // AI tools
  {
    id: 'chat-with-pdf',
    name: 'Chat with PDF',
    description: 'Ask questions about your PDF content',
    icon: 'chat',
    category: 'ai',
    route: '/chat-with-pdf',
    priority: 100,
    isAvailable: true,
  },
  {
    id: 'summarize-pdf',
    name: 'Summarize PDF',
    description: 'Generate concise summaries of PDF documents',
    icon: 'summarize',
    category: 'ai',
    route: '/summarize-pdf',
    priority: 90,
    isAvailable: true,
  },
  {
    id: 'translate-pdf',
    name: 'Translate PDF',
    description: 'Translate PDF content to different languages',
    icon: 'translate',
    category: 'ai',
    route: '/translate-pdf',
    priority: 80,
    isAvailable: false, // Not implemented in initial version
  },
  {
    id: 'generate-questions',
    name: 'Generate Questions',
    description: 'Generate questions based on PDF content',
    icon: 'questions',
    category: 'ai',
    route: '/generate-questions',
    priority: 70,
    isAvailable: false, // Not implemented in initial version
  },
];
