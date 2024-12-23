import { Notification } from '../types';

export const getInitialState = (): Notification[] => [];

export const updateNotificationState = (
  notifications: Notification[],
  id: string,
  updates: Partial<Notification>
): Notification[] => {
  return notifications.map(n => 
    n.id === id ? { ...n, ...updates } : n
  );
};

export const markAllNotificationsRead = (
  notifications: Notification[]
): Notification[] => {
  return notifications.map(n => ({ ...n, read: true }));
};