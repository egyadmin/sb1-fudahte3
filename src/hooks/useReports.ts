import { useMemo } from 'react';

export const useReports = () => {
  const reports = useMemo(() => [
    {
      titleEn: 'Monthly Performance Summary',
      titleAr: 'ملخص الأداء الشهري',
      dateEn: 'March 15, 2024',
      dateAr: '١٥ مارس ٢٠٢٤',
      type: 'performance'
    },
    {
      titleEn: 'Financial Quarter Review',
      titleAr: 'مراجعة الربع المالي',
      dateEn: 'March 10, 2024',
      dateAr: '١٠ مارس ٢٠٢٤',
      type: 'financial'
    },
    {
      titleEn: 'HR Status Report',
      titleAr: 'تقرير حالة الموارد البشرية',
      dateEn: 'March 5, 2024',
      dateAr: '٥ مارس ٢٠٢٤',
      type: 'hr'
    }
  ], []);

  return { reports };
};