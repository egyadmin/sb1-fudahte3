import { useMemo } from 'react';

export const useAudits = () => {
  const audits = useMemo(() => [
    {
      id: '1',
      titleEn: 'Annual Safety Inspection',
      titleAr: 'التفتيش السنوي للسلامة',
      dateEn: 'March 15, 2024',
      dateAr: '١٥ مارس ٢٠٢٤',
      statusEn: 'Completed',
      statusAr: 'مكتمل',
      score: 95
    },
    {
      id: '2',
      titleEn: 'Quality Management Review',
      titleAr: 'مراجعة إدارة الجودة',
      dateEn: 'March 10, 2024',
      dateAr: '١٠ مارس ٢٠٢٤',
      statusEn: 'In Progress',
      statusAr: 'قيد التنفيذ',
      score: 88
    }
  ], []);

  return { audits };
};