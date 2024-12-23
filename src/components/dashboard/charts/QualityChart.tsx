```tsx
import React from 'react';
import { DashboardChart } from './DashboardChart';
import { useLanguage } from '../../../contexts/LanguageContext';

export const QualityChart = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const data = {
    labels: isRTL 
      ? ['معايير السلامة', 'جودة العمل', 'الامتثال', 'رضا العملاء']
      : ['Safety Standards', 'Work Quality', 'Compliance', 'Customer Satisfaction'],
    datasets: [
      {
        label: isRTL ? 'النتيجة' : 'Score',
        data: [95, 88, 92, 85],
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
        borderWidth: 0
      }
    ]
  };

  return (
    <DashboardChart
      type="bar"
      data={data}
      title={isRTL ? 'مؤشرات الجودة' : 'Quality Metrics'}
      height={300}
    />
  );
};
```