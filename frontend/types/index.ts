// Common types used across the application

export type ToolCategory = 
  | 'organization' 
  | 'conversion' 
  | 'editing' 
  | 'security' 
  | 'enhancement' 
  | 'ai';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  route: string;
  priority: number; // Higher number = higher priority in the UI
  isAvailable: boolean; // Some tools might be disabled in certain conditions
}

export interface GeminiModel {
  name: string;
  description?: string;
  inputTokenLimit?: string | number;
  outputTokenLimit?: string | number;
}

export interface ProgressStatus {
  isLoading: boolean;
  progress: number; // 0-100
  message?: string;
  error?: string;
}
