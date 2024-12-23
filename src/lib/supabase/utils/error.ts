import { useToast } from '../../../hooks/useToast';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): never => {
  // Log error for debugging
  console.error('API Error:', error);

  // Handle empty error objects
  if (!error || (typeof error === 'object' && Object.keys(error).length === 0)) {
    throw new AppError('An unknown error occurred');
  }

  // Handle network errors
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    throw new AppError('Network connection error. Please check your internet connection.');
  }

  // Handle specific error types
  if (error instanceof AppError) {
    throw error;
  }
  
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  const details = error instanceof Error ? error.stack : undefined;
  
  throw new AppError(message, undefined, details);
};

export const isAuthError = (error: unknown): boolean => {
  if (!error) return false;
  
  return error instanceof Error && (
    error.message.includes('auth') || 
    error.message.includes('authentication') ||
    error.message.includes('not authenticated')
  );
};