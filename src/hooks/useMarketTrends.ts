import { useMemo } from 'react';

export const useMarketTrends = () => {
  const trends = useMemo(() => [
    {
      id: '1',
      titleEn: 'Digital Transformation',
      titleAr: 'التحول الرقمي',
      growthRate: 28,
      trendEn: 'Rising',
      trendAr: 'متزايد',
      impactEn: 'High impact on service delivery',
      impactAr: 'تأثير كبير على تقديم الخدمات'
    },
    {
      id: '2',
      titleEn: 'Sustainable Tech',
      titleAr: 'التكنولوجيا المستدامة',
      growthRate: 15,
      trendEn: 'Steady',
      trendAr: 'مستقر',
      impactEn: 'Medium impact on operations',
      impactAr: 'تأثير متوسط على العمليات'
    }
  ], []);

  return { trends };
};