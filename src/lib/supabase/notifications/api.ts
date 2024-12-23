import { supabase } from '../client';
import { withRetry } from './utils/retry';
import { notificationQueue } from './utils/queue';
import { transformNotification } from './utils/transformers';
import type { Notification } from './types';

export const notificationsApi = {
  async getNotifications(): Promise<Notification[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    return withRetry(async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(transformNotification);
    }, {
      maxAttempts: 3,
      delayMs: 1000,
      backoff: true
    });
  },

  async markAsRead(id: string): Promise<void> {
    return notificationQueue.add(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('notifications')
        .update({ 
          read: true, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    });
  },

  async markAllAsRead(): Promise<void> {
    return notificationQueue.add(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('notifications')
        .update({ 
          read: true, 
          updated_at: new Date().toISOString() 
        })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) throw error;
    });
  }
};