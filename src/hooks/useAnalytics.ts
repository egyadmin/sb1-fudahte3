import { useMemo } from 'react';

export const useAnalytics = () => {
  const metrics = useMemo(() => [
    {
      titleEn: 'Active Users',
      titleAr: 'المستخدمين النشطين',
      value: '1,234',
      trend: '+12%'
    },
    {
      titleEn: 'Response Time',
      titleAr: 'وقت الاستجابة',
      value: '0.8s',
      trend: '-15%'
    },
    {
      titleEn: 'Error Rate',
      titleAr: 'معدل الخطأ',
      value: '0.5%',
      trend: '-8%'
    }
  ], []);

  return { metrics };
};