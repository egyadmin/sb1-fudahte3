import { useState, useCallback } from 'react';
import { qualityApi } from '../lib/supabase/quality';
import { useToast } from './useToast';
import { useLanguage } from '../contexts/LanguageContext';

export const useQualityManagement = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const handleAddQualityStandard = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    category: string;
  }) => {
    try {
      setLoading(true);
      await qualityApi.addQualityStandard(data);
      showToast(
        isRTL ? 'تم إضافة معيار الجودة بنجاح' : 'Quality standard added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding quality standard:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة معيار الجودة' : 'Error adding quality standard',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const handleAddAudit = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    findingsEn?: string;
    findingsAr?: string;
    auditDate: string;
    score: number;
  }) => {
    try {
      setLoading(true);
      await qualityApi.addQualityAudit(data);
      showToast(
        isRTL ? 'تم إضافة التدقيق بنجاح' : 'Audit added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding audit:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة التدقيق' : 'Error adding audit',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const handleAddSafetyGuideline = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    contentEn: string;
    contentAr: string;
    category: string;
    priority: string;
    effectiveDate: string;
  }) => {
    try {
      setLoading(true);
      await qualityApi.addSafetyGuideline(data);
      showToast(
        isRTL ? 'تم إضافة إرشادات السلامة بنجاح' : 'Safety guideline added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding safety guideline:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة إرشادات السلامة' : 'Error adding safety guideline',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const handleAddEmergencyProtocol = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    procedureEn: string;
    procedureAr: string;
    emergencyType: string;
    priority: string;
  }) => {
    try {
      setLoading(true);
      await qualityApi.addEmergencyProtocol(data);
      showToast(
        isRTL ? 'تم إضافة بروتوكول الطوارئ بنجاح' : 'Emergency protocol added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding emergency protocol:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة بروتوكول الطوارئ' : 'Error adding emergency protocol',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  return {
    loading,
    handleAddQualityStandard,
    handleAddAudit,
    handleAddSafetyGuideline,
    handleAddEmergencyProtocol
  };
};