import { useMemo } from 'react';

export const useSafetyGuidelines = () => {
  const guidelines = useMemo(() => [
    {
      id: '1',
      titleEn: 'Emergency Response Protocol',
      titleAr: 'بروتوكول الاستجابة للطوارئ',
      descriptionEn: 'Standard procedures for emergency situations',
      descriptionAr: 'إجراءات موحدة لحالات الطوارئ',
      priority: 'high' as const
    },
    {
      id: '2',
      titleEn: 'Workplace Safety Standards',
      titleAr: 'معايير السلامة في مكان العمل',
      descriptionEn: 'Basic safety guidelines for daily operations',
      descriptionAr: 'إرشادات السلامة الأساسية للعمليات اليومية',
      priority: 'medium' as const
    }
  ], []);

  return { guidelines };
};