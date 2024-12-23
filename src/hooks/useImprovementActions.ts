import { useMemo } from 'react';

interface ImprovementAction {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  statusEn: string;
  statusAr: string;
  status: 'implemented' | 'in-progress' | 'planned';
}

export const useImprovementActions = () => {
  const actions = useMemo<ImprovementAction[]>(() => [
    {
      titleEn: 'Process Optimization',
      titleAr: 'تحسين العمليات',
      descriptionEn: 'Streamline workflow procedures',
      descriptionAr: 'تبسيط إجراءات سير العمل',
      statusEn: 'Implemented',
      statusAr: 'تم التنفيذ',
      status: 'implemented'
    },
    {
      titleEn: 'Quality Control Enhancement',
      titleAr: 'تعزيز مراقبة الجودة',
      descriptionEn: 'Implement additional quality checks',
      descriptionAr: 'تنفيذ فحوصات جودة إضافية',
      statusEn: 'In Progress',
      statusAr: 'قيد التنفيذ',
      status: 'in-progress'
    },
    {
      titleEn: 'Resource Allocation Review',
      titleAr: 'مراجعة تخصيص الموارد',
      descriptionEn: 'Optimize resource distribution',
      descriptionAr: 'تحسين توزيع الموارد',
      statusEn: 'Planned',
      statusAr: 'مخطط',
      status: 'planned'
    }
  ], []);

  return { actions };
};