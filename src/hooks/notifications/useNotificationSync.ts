import { useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { notificationsApi } from '../../lib/supabase/notifications/api';
import { useNotificationState } from './useNotificationState';
import { validateNotifications } from '../../lib/supabase/notifications/utils/validation';

export const useNotificationSync = () => {
  const { session } = useAuth();
  const { 
    setLoading, 
    setNotifications, 
    retryCount,
    incrementRetry,
    resetRetry
  } = useNotificationState();

  const sync = useCallback(async () => {
    if (!session?.user) {
      setLoading(false);
      setNotifications([]);
      return;
    }

    try {
      setLoading(true);
      const data = await notificationsApi.getNotifications();
      setNotifications(validateNotifications(data || []));
      resetRetry();
    } catch (error) {
      incrementRetry();
      console.debug('Notification sync error:', error);
    } finally {
      setLoading(false);
    }
  }, [session?.user, setLoading, setNotifications, incrementRetry, resetRetry]);

  useEffect(() => {
    sync();
    
    // Retry with exponential backoff
    if (retryCount > 0 && retryCount < 3) {
      const retryDelay = Math.pow(2, retryCount) * 1000;
      const timer = setTimeout(sync, retryDelay);
      return () => clearTimeout(timer);
    }
  }, [sync, retryCount]);

  return { sync };
};