import { useMemo } from 'react';

interface OperationalMetric {
  titleEn: string;
  titleAr: string;
  completion: number;
  trend: number;
}

export const useOperationalMetrics = () => {
  const metrics = useMemo<OperationalMetric[]>(() => [
    {
      titleEn: 'Project Implementation',
      titleAr: 'تنفيذ المشروع',
      completion: 85,
      trend: 12
    },
    {
      titleEn: 'Resource Utilization',
      titleAr: 'استخدام الموارد',
      completion: 78,
      trend: -3
    },
    {
      titleEn: 'Timeline Adherence',
      titleAr: 'الالتزام بالجدول الزمني',
      completion: 92,
      trend: 5
    }
  ], []);

  return { metrics };
};