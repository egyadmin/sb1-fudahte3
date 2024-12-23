import { useMemo } from 'react';

export const useContracts = () => {
  const contracts = useMemo(() => [
    {
      id: '1',
      supplierIdEn: 'SUP-001',
      supplierIdAr: 'مورد-001',
      titleEn: 'Annual IT Equipment Supply',
      titleAr: 'توريد معدات تقنية سنوية',
      value: 250000,
      startDateEn: 'January 1, 2024',
      startDateAr: '١ يناير ٢٠٢٤',
      endDateEn: 'December 31, 2024',
      endDateAr: '٣١ ديسمبر ٢٠٢٤',
      status: 'active' as const
    },
    {
      id: '2',
      supplierIdEn: 'SUP-002',
      supplierIdAr: 'مورد-002',
      titleEn: 'Office Supplies Contract',
      titleAr: 'عقد مستلزمات مكتبية',
      value: 75000,
      startDateEn: 'March 1, 2024',
      startDateAr: '١ مارس ٢٠٢٤',
      endDateEn: 'February 28, 2025',
      endDateAr: '٢٨ فبراير ٢٠٢٥',
      status: 'pending' as const
    }
  ], []);

  return { contracts };
};