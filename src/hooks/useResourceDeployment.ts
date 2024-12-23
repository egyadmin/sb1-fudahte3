import { useMemo } from 'react';

interface ResourceDeployment {
  titleEn: string;
  titleAr: string;
  statusEn: string;
  statusAr: string;
  quantity: number;
  status: 'deployed' | 'in-transit' | 'pending';
}

export const useResourceDeployment = () => {
  const resources = useMemo<ResourceDeployment[]>(() => [
    {
      titleEn: 'Field Engineers',
      titleAr: 'مهندسون ميدانيون',
      statusEn: 'Deployed',
      statusAr: 'تم النشر',
      quantity: 12,
      status: 'deployed'
    },
    {
      titleEn: 'Equipment',
      titleAr: 'معدات',
      statusEn: 'In Transit',
      statusAr: 'قيد النقل',
      quantity: 8,
      status: 'in-transit'
    },
    {
      titleEn: 'Support Staff',
      titleAr: 'طاقم الدعم',
      statusEn: 'Pending',
      statusAr: 'قيد الانتظار',
      quantity: 5,
      status: 'pending'
    }
  ], []);

  return { resources };
};