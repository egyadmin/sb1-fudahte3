import { useMemo } from 'react';

interface FinancialResource {
  categoryEn: string;
  categoryAr: string;
  amount: number;
}

interface HumanResource {
  roleEn: string;
  roleAr: string;
  count: number;
  utilization: number;
  growth: number;
}

interface ResourceAllocation {
  financial: FinancialResource[];
  human: HumanResource[];
}

export const useResourceAllocation = () => {
  const resources = useMemo<ResourceAllocation>(() => ({
    financial: [
      {
        categoryEn: 'Development',
        categoryAr: 'التطوير',
        amount: 500000
      },
      {
        categoryEn: 'Marketing',
        categoryAr: 'التسويق',
        amount: 300000
      },
      {
        categoryEn: 'Operations',
        categoryAr: 'العمليات',
        amount: 400000
      }
    ],
    human: [
      {
        roleEn: 'Developers',
        roleAr: 'مطورين',
        count: 15,
        utilization: 85,
        growth: 12
      },
      {
        roleEn: 'Managers',
        roleAr: 'مدراء',
        count: 5,
        utilization: 90,
        growth: 8
      },
      {
        roleEn: 'Support Staff',
        roleAr: 'فريق الدعم',
        count: 10,
        utilization: 75,
        growth: 15
      },
      {
        roleEn: 'Quality Assurance',
        roleAr: 'ضمان الجودة',
        count: 8,
        utilization: 82,
        growth: 10
      }
    ]
  }), []);

  return { resources };
};