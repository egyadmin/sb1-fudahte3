import { useNotificationState } from './notifications/useNotificationState';
import { useNotificationSync } from './notifications/useNotificationSync';
import { useNotificationUpdates } from './notifications/useNotificationUpdates';

export const useNotifications = () => {
  const { notifications, loading } = useNotificationState();
  const { sync } = useNotificationSync();
  const { markAsRead, markAllAsRead } = useNotificationUpdates();

  return {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    refresh: sync
  };
};