import { useState, useCallback } from 'react';
import { reportsApi } from '../lib/supabase/reports';
import { useToast } from './useToast';
import { useLanguage } from '../contexts/LanguageContext';

export const useReportsManagement = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const generateReport = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    typeEn: string;
    typeAr: string;
    contentEn?: string;
    contentAr?: string;
    startDate: string;
    endDate: string;
    department: string;
  }) => {
    try {
      setLoading(true);
      await reportsApi.addReport(data);
      showToast(
        isRTL ? 'تم إنشاء التقرير بنجاح' : 'Report generated successfully',
        'success'
      );
    } catch (error) {
      console.error('Error generating report:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إنشاء التقرير' : 'Error generating report',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const updateReportStatus = useCallback(async (id: string, status: string) => {
    try {
      setLoading(true);
      await reportsApi.updateReport(id, { status });
      showToast(
        isRTL ? 'تم تحديث حالة التقرير بنجاح' : 'Report status updated successfully',
        'success'
      );
    } catch (error) {
      console.error('Error updating report status:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء تحديث حالة التقرير' : 'Error updating report status',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const addComment = useCallback(async (data: {
    reportId: string;
    commentEn: string;
    commentAr: string;
  }) => {
    try {
      setLoading(true);
      await reportsApi.addComment(data);
      showToast(
        isRTL ? 'تمت إضافة التعليق بنجاح' : 'Comment added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding comment:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة التعليق' : 'Error adding comment',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  return {
    loading,
    generateReport,
    updateReportStatus,
    addComment
  };
};