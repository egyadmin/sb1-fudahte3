import { useMemo } from 'react';

interface ProjectObjective {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export const useProjectObjectives = () => {
  const objectives = useMemo<ProjectObjective[]>(() => [
    {
      titleEn: 'Market Expansion',
      titleAr: 'التوسع في السوق',
      descriptionEn: 'Expand market presence by 30% in key regions',
      descriptionAr: 'توسيع التواجد في السوق بنسبة 30٪ في المناطق الرئيسية',
      status: 'in-progress'
    },
    {
      titleEn: 'Operational Efficiency',
      titleAr: 'الكفاءة التشغيلية',
      descriptionEn: 'Improve operational efficiency by 25%',
      descriptionAr: 'تحسين الكفاءة التشغيلية بنسبة 25٪',
      status: 'pending'
    },
    {
      titleEn: 'Customer Satisfaction',
      titleAr: 'رضا العملاء',
      descriptionEn: 'Achieve 95% customer satisfaction rate',
      descriptionAr: 'تحقيق معدل رضا العملاء بنسبة 95٪',
      status: 'in-progress'
    }
  ], []);

  return { objectives };
};