import { useMemo } from 'react';

interface PerformanceMetric {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  progress: number;
  trend: number;
}

export const usePerformanceMetrics = () => {
  const metrics = useMemo<PerformanceMetric[]>(() => [
    {
      titleEn: 'Project Completion',
      titleAr: 'إنجاز المشروع',
      descriptionEn: 'Overall progress against timeline',
      descriptionAr: 'التقدم العام مقابل الجدول الزمني',
      progress: 75,
      trend: 5
    },
    {
      titleEn: 'Resource Utilization',
      titleAr: 'استخدام الموارد',
      descriptionEn: 'Efficiency of resource usage',
      descriptionAr: 'كفاءة استخدام الموارد',
      progress: 82,
      trend: -2
    },
    {
      titleEn: 'Quality Metrics',
      titleAr: 'مقاييس الجودة',
      descriptionEn: 'Quality standards compliance',
      descriptionAr: 'الامتثال لمعايير الجودة',
      progress: 90,
      trend: 3
    }
  ], []);

  return { metrics };
};