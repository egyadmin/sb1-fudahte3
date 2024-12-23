import { useMemo } from 'react';

export const useStrategicGoals = () => {
  const goals = useMemo(() => [
    {
      titleEn: 'Market Expansion Strategy',
      titleAr: 'استراتيجية التوسع في السوق',
      progressPercent: 75,
      status: 'on-track' as const
    },
    {
      titleEn: 'Digital Transformation Initiative',
      titleAr: 'مبادرة التحول الرقمي',
      progressPercent: 45,
      status: 'at-risk' as const
    },
    {
      titleEn: 'Operational Efficiency Program',
      titleAr: 'برنامج الكفاءة التشغيلية',
      progressPercent: 30,
      status: 'behind' as const
    }
  ], []);

  return { goals };
};