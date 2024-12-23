import { useMemo } from 'react';

export const useCompliance = () => {
  const metrics = useMemo(() => [
    {
      titleEn: 'Safety Standards',
      titleAr: 'معايير السلامة',
      value: 45,
      total: 50,
      status: 'compliant' as const
    },
    {
      titleEn: 'Quality Metrics',
      titleAr: 'مقاييس الجودة',
      value: 28,
      total: 35,
      status: 'partial' as const
    },
    {
      titleEn: 'Compliance Rules',
      titleAr: 'قواعد الامتثال',
      value: 18,
      total: 20,
      status: 'compliant' as const
    }
  ], []);

  return { metrics };
};