```tsx
import React from 'react';
import { DashboardChart } from './DashboardChart';
import { useLanguage } from '../../../contexts/LanguageContext';

export const InnovationChart = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const data = {
    labels: isRTL 
      ? ['التحول الرقمي', 'التكنولوجيا المستدامة', 'الذكاء الاصطناعي', 'تحسين العمليات']
      : ['Digital Transformation', 'Sustainable Tech', 'AI Integration', 'Process Innovation'],
    datasets: [
      {
        label: isRTL ? 'معدل النمو' : 'Growth Rate',
        data: [28, 15, 35, 22],
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
      type="pie"
      data={data}
      title={isRTL ? 'اتجاهات الابتكار' : 'Innovation Trends'}
      height={300}
    />
  );
};
```