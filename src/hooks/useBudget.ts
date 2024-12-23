import { useMemo } from 'react';

export const useBudget = () => {
  const totalBudget = 25000000; // 25 Million SAR

  const categories = useMemo(() => [
    {
      nameEn: 'Operations',
      nameAr: 'العمليات',
      allocated: 10000000,
      spent: 7500000,
      trend: '+5%',
      subcategories: [
        { nameEn: 'Equipment', nameAr: 'المعدات', amount: 4000000 },
        { nameEn: 'Maintenance', nameAr: 'الصيانة', amount: 2500000 },
        { nameEn: 'Logistics', nameAr: 'الخدمات اللوجستية', amount: 3500000 }
      ]
    },
    {
      nameEn: 'Human Resources',
      nameAr: 'الموارد البشرية',
      allocated: 6000000,
      spent: 4200000,
      trend: '+3%',
      subcategories: [
        { nameEn: 'Salaries', nameAr: 'الرواتب', amount: 3500000 },
        { nameEn: 'Training', nameAr: 'التدريب', amount: 1500000 },
        { nameEn: 'Benefits', nameAr: 'المزايا', amount: 1000000 }
      ]
    },
    {
      nameEn: 'Technology',
      nameAr: 'التكنولوجيا',
      allocated: 5000000,
      spent: 3800000,
      trend: '+8%',
      subcategories: [
        { nameEn: 'Software', nameAr: 'البرمجيات', amount: 2000000 },
        { nameEn: 'Hardware', nameAr: 'الأجهزة', amount: 2000000 },
        { nameEn: 'Infrastructure', nameAr: 'البنية التحتية', amount: 1000000 }
      ]
    },
    {
      nameEn: 'Marketing',
      nameAr: 'التسويق',
      allocated: 4000000,
      spent: 2800000,
      trend: '+2%',
      subcategories: [
        { nameEn: 'Campaigns', nameAr: 'الحملات', amount: 2000000 },
        { nameEn: 'Events', nameAr: 'الفعاليات', amount: 1200000 },
        { nameEn: 'Digital', nameAr: 'التسويق الرقمي', amount: 800000 }
      ]
    }
  ], []);

  const quarterlyData = useMemo(() => [
    { quarter: 'Q1', planned: 6250000, actual: 5800000 },
    { quarter: 'Q2', planned: 6250000, actual: 5900000 },
    { quarter: 'Q3', planned: 6250000, actual: 6100000 },
    { quarter: 'Q4', planned: 6250000, projected: 6500000 }
  ], []);

  const metrics = useMemo(() => ({
    utilizationRate: 85,
    savingsRate: 8,
    variancePercent: -2.5,
    forecastAccuracy: 95
  }), []);

  return {
    totalBudget,
    categories,
    quarterlyData,
    metrics,
    spent: categories.reduce((sum, cat) => sum + cat.spent, 0),
    remaining: totalBudget - categories.reduce((sum, cat) => sum + cat.spent, 0)
  };
};