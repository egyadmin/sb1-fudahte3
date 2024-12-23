import { useCallback } from 'react';
import { notificationsApi } from '../../lib/supabase/notifications/api';
import { useToast } from '../useToast';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  isNetworkError, 
  isAuthError,
  createNotificationError 
} from '../../lib/supabase/notifications/utils/error';

export const useNotificationActions = () => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const handleError = useCallback((error: unknown, silent = false) => {
    // Log all errors for debugging
    console.debug('Notification error:', error);

    // Don't show toast for network or auth errors if silent is true
    if (silent && (isNetworkError(error) || isAuthError(error))) {
      return;
    }

    // Show toast for other errors
    if (!isNetworkError(error)) {
      showToast(
        isRTL ? 'حدث خطأ أثناء معالجة الإشعارات' : 'Error processing notifications',
        'error'
      );
    }
  }, [isRTL, showToast]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }, [handleError]);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();
      showToast(
        isRTL ? 'تم تحديث جميع الإشعارات' : 'All notifications marked as read',
        'success'
      );
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }, [isRTL, showToast, handleError]);

  return {
    markAsRead,
    markAllAsRead,
    handleError
  };
};