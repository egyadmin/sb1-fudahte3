```typescript
import { useState, useCallback } from 'react';
import { legalApi } from '../lib/supabase/legal';
import { useToast } from './useToast';
import { useLanguage } from '../contexts/LanguageContext';

export const useLegalCompliance = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const addLegalDocument = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    type: string;
    contentEn: string;
    contentAr: string;
    status: string;
    effectiveDate: string;
    expiryDate?: string;
    documentNumber?: string;
    issuingAuthorityEn?: string;
    issuingAuthorityAr?: string;
  }) => {
    try {
      setLoading(true);
      await legalApi.addLegalDocument(data);
      showToast(
        isRTL ? 'تم إضافة الوثيقة بنجاح' : 'Document added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding legal document:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة الوثيقة' : 'Error adding document',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const addComplianceChecklist = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    category: string;
    priority: string;
    dueDate: string;
  }) => {
    try {
      setLoading(true);
      await legalApi.addComplianceChecklist(data);
      showToast(
        isRTL ? 'تم إضافة قائمة التحقق بنجاح' : 'Checklist added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding compliance checklist:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة قائمة التحقق' : 'Error adding checklist',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const addComplianceTraining = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    type: string;
    startDate: string;
    endDate: string;
    materialsUrl?: string;
    completionCriteria?: string;
  }) => {
    try {
      setLoading(true);
      await legalApi.addComplianceTraining(data);
      showToast(
        isRTL ? 'تم إضافة التدريب بنجاح' : 'Training added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding compliance training:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة التدريب' : 'Error adding training',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const addComplianceAudit = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    type: string;
    scopeEn: string;
    scopeAr: string;
    findingsEn?: string;
    findingsAr?: string;
    auditDate: string;
    auditorEn: string;
    auditorAr: string;
    score?: number;
  }) => {
    try {
      setLoading(true);
      await legalApi.addComplianceAudit(data);
      showToast(
        isRTL ? 'تم إضافة التدقيق بنجاح' : 'Audit added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding compliance audit:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة التدقيق' : 'Error adding audit',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const addLegalContract = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    type: string;
    descriptionEn?: string;
    descriptionAr?: string;
    startDate: string;
    endDate?: string;
    value?: number;
    partyNameEn: string;
    partyNameAr: string;
    termsEn?: string;
    termsAr?: string;
  }) => {
    try {
      setLoading(true);
      await legalApi.addLegalContract(data);
      showToast(
        isRTL ? 'تم إضافة العقد بنجاح' : 'Contract added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding legal contract:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة العقد' : 'Error adding contract',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  return {
    loading,
    addLegalDocument,
    addComplianceChecklist,
    addComplianceTraining,
    addComplianceAudit,
    addLegalContract
  };
};
```