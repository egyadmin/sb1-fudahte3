import { useState, useCallback } from 'react';
import type { Notification } from '../../lib/supabase/notifications/types';
import { 
  getInitialState, 
  updateNotificationState, 
  markAllNotificationsRead 
} from '../../lib/supabase/notifications/utils/state';

export const useNotificationState = () => {
  const [notifications, setNotifications] = useState<Notification[]>(getInitialState());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const updateNotification = useCallback((id: string, updates: Partial<Notification>) => {
    setNotifications(prev => updateNotificationState(prev, id, updates));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => markAllNotificationsRead(prev));
  }, []);

  const incrementRetry = useCallback(() => {
    setRetryCount(prev => Math.min(prev + 1, 3)); // Max 3 retries
  }, []);

  const resetRetry = useCallback(() => {
    setRetryCount(0);
    setError(null);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setError(null);
  }, []);

  return {
    notifications,
    loading,
    error,
    retryCount,
    setLoading,
    setError,
    setNotifications,
    updateNotification,
    markAllRead,
    incrementRetry,
    resetRetry,
    clearNotifications
  };
};