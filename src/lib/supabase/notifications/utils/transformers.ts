import type { Notification } from '../types';

export const transformNotification = (data: any): Notification => ({
  id: data.id,
  titleEn: data.title_en,
  titleAr: data.title_ar,
  messageEn: data.message_en,
  messageAr: data.message_ar,
  type: data.type,
  read: data.read,
  userId: data.user_id,
  createdAt: data.created_at,
  updatedAt: data.updated_at
});