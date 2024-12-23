import { useState, useCallback } from 'react';
import { financeApi } from '../lib/supabase/finance';
import { useToast } from './useToast';
import { useLanguage } from '../contexts/LanguageContext';

export const useFinancialManagement = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const handleAddBudgetCategory = useCallback(async (data: {
    nameEn: string;
    nameAr: string;
    allocated: number;
    fiscalYear: string;
  }) => {
    try {
      setLoading(true);
      await financeApi.addBudgetCategory(data);
      showToast(
        isRTL ? 'تم إضافة فئة الميزانية بنجاح' : 'Budget category added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding budget category:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة فئة الميزانية' : 'Error adding budget category',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const handleAddTransaction = useCallback(async (data: {
    typeEn: string;
    typeAr: string;
    amount: number;
    categoryId: string;
    descriptionEn?: string;
    descriptionAr?: string;
    transactionDate: string;
  }) => {
    try {
      setLoading(true);
      await financeApi.addTransaction(data);
      showToast(
        isRTL ? 'تم إضافة المعاملة بنجاح' : 'Transaction added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error adding transaction:', error);
      showToast(
        isRTL ? 'حدث خطأ أثناء إضافة المعاملة' : 'Error adding transaction',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [isRTL, showToast]);

  const handleGenerateReport = useCallback(async (data: {
    titleEn: string;
    titleAr: string;
    typeEn: string;
    typeAr: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      setLoading(true);
      await financeApi.generateReport(data);
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

  return {
    loading,
    handleAddBudgetCategory,
    handleAddTransaction,
    handleGenerateReport
  };
};