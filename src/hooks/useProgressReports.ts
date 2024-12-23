import { useMemo } from 'react';

interface ProgressReport {
  titleEn: string;
  titleAr: string;
  dateEn: string;
  dateAr: string;
  statusEn: string;
  statusAr: string;
  status: 'approved' | 'pending' | 'rejected';
}

export const useProgressReports = () => {
  const reports = useMemo<ProgressReport[]>(() => [
    {
      titleEn: 'Weekly Site Progress',
      titleAr: 'تقدم الموقع الأسبوعي',
      dateEn: 'March 15, 2024',
      dateAr: '١٥ مارس ٢٠٢٤',
      statusEn: 'Approved',
      statusAr: 'معتمد',
      status: 'approved'
    },
    {
      titleEn: 'Resource Utilization',
      titleAr: 'استخدام الموارد',
      dateEn: 'March 14, 2024',
      dateAr: '١٤ مارس ٢٠٢٤',
      statusEn: 'Pending Review',
      statusAr: 'قيد المراجعة',
      status: 'pending'
    },
    {
      titleEn: 'Quality Assessment',
      titleAr: 'تقييم الجودة',
      dateEn: 'March 13, 2024',
      dateAr: '١٣ مارس ٢٠٢٤',
      statusEn: 'Needs Revision',
      statusAr: 'يحتاج مراجعة',
      status: 'rejected'
    }
  ], []);

  return { reports };
};