```tsx
import React from 'react';
import { DashboardChart } from './DashboardChart';
import { useLanguage } from '../../../contexts/LanguageContext';

export const BudgetChart = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const data = {
    labels: isRTL 
      ? ['العمليات', 'التسويق', 'التطوير', 'البحث']
      : ['Operations', 'Marketing', 'Development', 'Research'],
    datasets: [
      {
        label: isRTL ? 'المخصص' : 'Allocated',
        data: [400000, 300000, 200000, 100000],
        backgroundColor: ['#4F46E5', '#34D399', '#FBBF24', '#F87171'],
        borderWidth: 1
      }
    ]
  };

  return (
    <DashboardChart
      type="pie"
      data={data}
      title={isRTL ? 'توزيع الميزانية' : 'Budget Distribution'}
      height={300}
    />
  );
};
```