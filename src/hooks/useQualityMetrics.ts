import { useMemo } from 'react';

interface QualityMetric {
  titleEn: string;
  titleAr: string;
  score: number;
  statusEn: string;
  statusAr: string;
}

export const useQualityMetrics = () => {
  const metrics = useMemo<QualityMetric[]>(() => [
    {
      titleEn: 'Safety Standards',
      titleAr: 'معايير السلامة',
      score: 95,
      statusEn: 'Exceeds expectations',
      statusAr: 'يتجاوز التوقعات'
    },
    {
      titleEn: 'Work Quality',
      titleAr: 'جودة العمل',
      score: 88,
      statusEn: 'Meets standards',
      statusAr: 'يلبي المعايير'
    },
    {
      titleEn: 'Timeline Adherence',
      titleAr: 'الالتزام بالجدول الزمني',
      score: 82,
      statusEn: 'Needs improvement',
      statusAr: 'يحتاج إلى تحسين'
    }
  ], []);

  return { metrics };
};