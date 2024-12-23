export class NotificationError extends Error {
  constructor(
    message: string,
    public code?: string,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'NotificationError';
  }
}

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && (
    error.message.includes('Failed to fetch') ||
    error.message.includes('Network request failed')
  );
};

export const isAuthError = (error: unknown): boolean => {
  return error instanceof Error && (
    error.message.includes('auth') ||
    error.message.includes('authentication') ||
    error.message.includes('not authenticated')
  );
};

export const handleNotificationError = (error: unknown): NotificationError => {
  if (error instanceof NotificationError) {
    return error;
  }

  if (isNetworkError(error)) {
    return new NotificationError(
      'Network connection error',
      'NETWORK_ERROR',
      true // Network errors are retryable
    );
  }

  if (isAuthError(error)) {
    return new NotificationError(
      'Authentication error',
      'AUTH_ERROR',
      false // Auth errors are not retryable
    );
  }

  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  return new NotificationError(message, 'UNKNOWN_ERROR', false);
};