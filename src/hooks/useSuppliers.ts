import { useMemo } from 'react';

export const useSuppliers = () => {
  const suppliers = useMemo(() => [
    {
      id: '1',
      nameEn: 'Tech Solutions Inc.',
      nameAr: 'تك سوليوشنز',
      categoryEn: 'IT Equipment',
      categoryAr: 'معدات تقنية',
      rating: 4.8,
      email: 'contact@techsolutions.com',
      phone: '+1 (555) 123-4567',
      status: 'active' as const
    },
    {
      id: '2',
      nameEn: 'Global Office Supplies',
      nameAr: 'التجهيزات المكتبية العالمية',
      categoryEn: 'Office Supplies',
      categoryAr: 'مستلزمات مكتبية',
      rating: 4.5,
      email: 'sales@globalsupplies.com',
      phone: '+1 (555) 987-6543',
      status: 'active' as const
    }
  ], []);

  return { suppliers };
};