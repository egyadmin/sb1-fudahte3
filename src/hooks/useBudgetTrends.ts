import { useMemo } from 'react';

interface BudgetTrend {
  categoryEn: string;
  categoryAr: string;
  periodEn: string;
  periodAr: string;
  change: number;
}

export const useBudgetTrends = () => {
  const trends = useMemo<BudgetTrend[]>(() => [
    {
      categoryEn: 'Operating Expenses',
      categoryAr: 'نفقات التشغيل',
      periodEn: 'vs Last Month',
      periodAr: 'مقارنة بالشهر الماضي',
      change: -5.2
    },
    {
      categoryEn: 'Capital Investments',
      categoryAr: 'الاستثمارات الرأسمالية',
      periodEn: 'vs Last Quarter',
      periodAr: 'مقارنة بالربع الماضي',
      change: 12.8
    },
    {
      categoryEn: 'Marketing Budget',
      categoryAr: 'ميزانية التسويق',
      periodEn: 'vs Last Month',
      periodAr: 'مقارنة بالشهر الماضي',
      change: 3.4
    }
  ], []);

  return { trends };
};