import { useMemo } from 'react';

interface QualityTrend {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  statusEn: string;
  statusAr: string;
  status: 'improved' | 'stable' | 'declined';
}

export const useQualityTrends = () => {
  const trends = useMemo<QualityTrend[]>(() => [
    {
      titleEn: 'Work Quality Standards',
      titleAr: 'معايير جودة العمل',
      descriptionEn: 'Significant improvement in quality metrics',
      descriptionAr: 'تحسن ملحوظ في مقاييس الجودة',
      statusEn: 'Improved',
      statusAr: 'تحسن',
      status: 'improved'
    },
    {
      titleEn: 'Safety Compliance',
      titleAr: 'الامتثال للسلامة',
      descriptionEn: 'Maintaining high safety standards',
      descriptionAr: 'الحفاظ على معايير السلامة العالية',
      statusEn: 'Stable',
      statusAr: 'مستقر',
      status: 'stable'
    }
  ], []);

  return { trends };
};