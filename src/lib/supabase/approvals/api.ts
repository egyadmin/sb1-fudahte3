import { supabase } from '../client';
import type { Approval, ApprovalRequest } from './types';
import { handleError } from '../utils/error';

export const approvalsApi = {
  async getApprovals() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('approvals')
        .select('*')
        .or(`requester_id.eq.${user.id},approver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleError(error);
    }
  },

  async createApproval(request: ApprovalRequest) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('approvals')
        .insert([{
          title_en: request.titleEn,
          title_ar: request.titleAr,
          description_en: request.descriptionEn,
          description_ar: request.descriptionAr,
          type: request.type,
          status: 'pending',
          requester_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error);
    }
  },

  async updateApprovalStatus(id: string, status: 'approved' | 'rejected', notes?: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('approvals')
        .update({
          status,
          approver_id: user.id,
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error);
    }
  }
};