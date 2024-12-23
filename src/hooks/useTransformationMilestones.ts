import { useMemo } from 'react';

export const useTransformationMilestones = () => {
  const milestones = useMemo(() => [
    {
      id: '1',
      titleEn: 'Cloud Migration',
      titleAr: 'الانتقال إلى السحابة',
      progressPercent: 75,
      statusEn: 'On Track',
      statusAr: 'في المسار',
      dueDateEn: 'April 2024',
      dueDateAr: 'أبريل ٢٠٢٤'
    },
    {
      id: '2',
      titleEn: 'AI Implementation',
      titleAr: 'تنفيذ الذكاء الاصطناعي',
      progressPercent: 45,
      statusEn: 'In Progress',
      statusAr: 'قيد التنفيذ',
      dueDateEn: 'June 2024',
      dueDateAr: 'يونيو ٢٠٢٤'
    }
  ], []);

  return { milestones };
};