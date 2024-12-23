import { useMemo } from 'react';

export const useComplianceItems = () => {
  const items = useMemo(() => [
    {
      id: '1',
      titleEn: 'Annual Compliance Training',
      titleAr: 'التدريب السنوي على الامتثال',
      dueDateEn: 'April 30, 2024',
      dueDateAr: '٣٠ أبريل ٢٠٢٤',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '2',
      titleEn: 'Data Privacy Audit',
      titleAr: 'تدقيق خصوصية البيانات',
      dueDateEn: 'May 15, 2024',
      dueDateAr: '١٥ مايو ٢٠٢٤',
      status: 'completed',
      priority: 'medium'
    }
  ], []);

  return { items };
};