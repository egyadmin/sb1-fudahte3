interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoff?: boolean;
  silent?: boolean;
}

export const withRetry = async <T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const { 
    maxAttempts = 3,
    delayMs = 1000,
    backoff = true,
    silent = false
  } = options;

  let lastError: unknown;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Only retry on network errors
      if (!isNetworkError(error) || attempt === maxAttempts) {
        throw error;
      }

      if (!silent) {
        console.debug(`Retry attempt ${attempt}/${maxAttempts}`);
      }

      // Exponential backoff
      const delay = backoff ? delayMs * Math.pow(2, attempt - 1) : delayMs;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};