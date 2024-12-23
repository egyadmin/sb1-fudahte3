import { useMemo } from 'react';

interface ResourceEfficiencyItem {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  efficiency: number;
}

export const useResourceEfficiency = () => {
  const efficiency = useMemo<ResourceEfficiencyItem[]>(() => [
    {
      titleEn: 'Human Resources',
      titleAr: 'الموارد البشرية',
      descriptionEn: 'Team productivity and allocation',
      descriptionAr: 'إنتاجية الفريق والتوزيع',
      efficiency: 87
    },
    {
      titleEn: 'Equipment Utilization',
      titleAr: 'استخدام المعدات',
      descriptionEn: 'Equipment usage optimization',
      descriptionAr: 'تحسين استخدام المعدات',
      efficiency: 92
    }
  ], []);

  return { efficiency };
};