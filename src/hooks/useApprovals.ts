import { useState, useCallback } from 'react';
import { approvalsApi } from '../lib/supabase/approvals/api';
import { useToast } from './useToast';
import { useLanguage } from '../contexts/LanguageContext';
import type { ApprovalRequest } from '../lib/supabase/approvals/types';

export const useApprovals = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const createApproval = useCallback(async (request: ApprovalRequest) => {
    try {
      setLoading(true);
      await approvalsApi.createApproval(request);
      showToast(
        isRTL ? 'تم إرسال طلب الموافقة بنجاح' : 'Approval request submitted successfully',
        'success'
      );
    } catch (error) {
      console.error('Error creating approval:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إرسال الطلب' : 'Error submitting request',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const updateStatus = useCallback(async (id: string, status: 'approved' | 'rejected', notes?: string) => {
    try {
      setLoading(true);
      await approvalsApi.updateApprovalStatus(id, status, notes);
      showToast(
        isRTL 
          ? status === 'approved' ? 'تمت الموافقة على الطلب' : 'تم رفض الطلب'
          : status === 'approved' ? 'Request approved' : 'Request rejected',
        'success'
      );
    } catch (error) {
      console.error('Error updating approval:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء تحديث الطلب' : 'Error updating request',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  return {
    loading,
    createApproval,
    updateStatus
  };
};