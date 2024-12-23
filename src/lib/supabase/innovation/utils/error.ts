export class InnovationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'InnovationError';
  }
}

export const handleApiError = (error: unknown): never => {
  if (error instanceof InnovationError) {
    throw error;
  }
  
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  throw new InnovationError(message);
};