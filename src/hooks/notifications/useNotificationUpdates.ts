import { useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { notificationsApi } from '../../lib/supabase/notifications/api';
import { useNotificationState } from './useNotificationState';
import { useToast } from '../useToast';
import { useLanguage } from '../../contexts/LanguageContext';

export const useNotificationUpdates = () => {
  const { session } = useAuth();
  const { language } = useLanguage();
  const { showToast } = useToast();
  const { updateNotification, markAllRead } = useNotificationState();
  const isRTL = language === 'ar';

  const handleMarkAsRead = useCallback(async (id: string) => {
    if (!session?.user) return false;
    
    try {
      await notificationsApi.markAsRead(id);
      updateNotification(id, { read: true });
      return true;
    } catch (error) {
      showToast(
        isRTL ? 'حدث خطأ أثناء تحديث الإشعار' : 'Error updating notification',
        'error'
      );
      return false;
    }
  }, [session?.user, updateNotification, showToast, isRTL]);

  const handleMarkAllAsRead = useCallback(async () => {
    if (!session?.user) return false;
    
    try {
      await notificationsApi.markAllAsRead();
      markAllRead();
      showToast(
        isRTL ? 'تم تحديث جميع الإشعارات' : 'All notifications marked as read',
        'success'
      );
      return true;
    } catch (error) {
      showToast(
        isRTL ? 'حدث خطأ أثناء تحديث الإشعارات' : 'Error updating notifications',
        'error'
      );
      return false;
    }
  }, [session?.user, markAllRead, showToast, isRTL]);

  return {
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead
  };
};