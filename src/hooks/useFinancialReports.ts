import { useMemo } from 'react';

export const useFinancialReports = () => {
  const reports = useMemo(() => [
    {
      id: '1',
      titleEn: 'Monthly Income Statement',
      titleAr: 'بيان الدخل الشهري',
      dateEn: 'March 2024',
      dateAr: 'مارس ٢٠٢٤',
      type: 'income' as const
    },
    {
      id: '2',
      titleEn: 'Quarterly Expense Report',
      titleAr: 'تقرير المصروفات الربع سنوي',
      dateEn: 'Q1 2024',
      dateAr: 'الربع الأول ٢٠٢٤',
      type: 'expense' as const
    },
    {
      id: '3',
      titleEn: 'Balance Sheet',
      titleAr: 'الميزانية العمومية',
      dateEn: 'March 2024',
      dateAr: 'مارس ٢٠٢٤',
      type: 'balance' as const
    }
  ], []);

  return { reports };
};