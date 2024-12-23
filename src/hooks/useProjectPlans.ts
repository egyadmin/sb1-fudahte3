import { useMemo } from 'react';

interface ProjectPlan {
  phaseEn: string;
  phaseAr: string;
  statusEn: string;
  statusAr: string;
  nextStepEn: string;
  nextStepAr: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export const useProjectPlans = () => {
  const plans = useMemo<ProjectPlan[]>(() => [
    {
      phaseEn: 'Initial Planning',
      phaseAr: 'التخطيط الأولي',
      statusEn: 'Completed',
      statusAr: 'مكتمل',
      nextStepEn: 'Proceed to resource allocation',
      nextStepAr: 'المتابعة إلى تخصيص الموارد',
      status: 'completed'
    },
    {
      phaseEn: 'Resource Planning',
      phaseAr: 'تخطيط الموارد',
      statusEn: 'In Progress',
      statusAr: 'قيد التنفيذ',
      nextStepEn: 'Finalize budget allocation',
      nextStepAr: 'الانتهاء من تخصيص الميزانية',
      status: 'in-progress'
    },
    {
      phaseEn: 'Implementation Planning',
      phaseAr: 'تخطيط التنفيذ',
      statusEn: 'Pending',
      statusAr: 'قيد الانتظار',
      nextStepEn: 'Start implementation phase',
      nextStepAr: 'بدء مرحلة التنفيذ',
      status: 'pending'
    }
  ], []);

  return { plans };
};