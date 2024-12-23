// Queue implementation for batching notification operations
type QueuedOperation<T> = () => Promise<T>;

class NotificationQueue {
  private queue: QueuedOperation<any>[] = [];
  private processing = false;
  private maxRetries = 3;

  async add<T>(operation: QueuedOperation<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        let attempts = 0;
        while (attempts < this.maxRetries) {
          try {
            const result = await operation();
            resolve(result);
            return;
          } catch (error) {
            attempts++;
            if (attempts === this.maxRetries) {
              reject(error);
              return;
            }
            // Exponential backoff
            await new Promise(r => setTimeout(r, Math.pow(2, attempts) * 1000));
          }
        }
      });

      if (!this.processing) {
        this.processQueue();
      }
    });
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    while (this.queue.length > 0) {
      const operation = this.queue.shift();
      if (operation) {
        try {
          await operation();
        } catch (error) {
          console.error('Queue operation failed:', error);
        }
      }
    }
    this.processing = false;
  }
}

export const notificationQueue = new NotificationQueue();