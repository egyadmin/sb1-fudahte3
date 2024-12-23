import type { Notification } from '../types';

export const isValidNotification = (notification: unknown): notification is Notification => {
  if (!notification || typeof notification !== 'object') return false;
  
  const n = notification as Partial<Notification>;
  return !!(
    n.id &&
    n.titleEn &&
    n.titleAr &&
    n.messageEn &&
    n.messageAr &&
    n.type &&
    typeof n.read === 'boolean'
  );
};

export const validateNotifications = (data: unknown[]): Notification[] => {
  return data.filter(isValidNotification);
};