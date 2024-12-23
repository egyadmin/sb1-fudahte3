import { useMemo } from 'react';

interface ImprovementProgressItem {
  titleEn: string;
  titleAr: string;
  impactEn: string;
  impactAr: string;
  statusEn: string;
  statusAr: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
}

export const useImprovementProgress = () => {
  const progress = useMemo<ImprovementProgressItem[]>(() => [
    {
      titleEn: 'Process Optimization',
      titleAr: 'تحسين العمليات',
      impactEn: 'Increased efficiency by 25%',
      impactAr: 'زيادة الكفاءة بنسبة 25٪',
      statusEn: 'Completed',
      statusAr: 'مكتمل',
      status: 'completed',
      progress: 100
    },
    {
      titleEn: 'Quality Enhancement',
      titleAr: 'تعزيز الجودة',
      impactEn: 'Reduced defects by 40%',
      impactAr: 'تقليل العيوب بنسبة 40٪',
      statusEn: 'In Progress',
      statusAr: 'قيد التنفيذ',
      status: 'in-progress',
      progress: 75
    }
  ], []);

  return { progress };
};