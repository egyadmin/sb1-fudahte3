```tsx
import React from 'react';
import { DashboardChart } from './DashboardChart';
import { useLanguage } from '../../../contexts/LanguageContext';

export const HRChart = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const data = {
    labels: isRTL 
      ? ['التوظيف', 'الأداء', 'التدريب', 'الاحتفاظ']
      : ['Recruitment', 'Performance', 'Training', 'Retention'],
    datasets: [
      {
        label: isRTL ? 'المؤشر' : 'Metric',
        data: [85, 92, 78, 88],
        backgroundColor: [
          '#4F46E5',
          '#34D399',
          '#FBBF24',
          '#F87171'
        ]
      }
    ]
  };

  return (
    <DashboardChart
      type="bar"
      data={data}
      title={isRTL ? 'مؤشرات الموارد البشرية' : 'HR Metrics'}
      height={300}
    />
  );
};
```