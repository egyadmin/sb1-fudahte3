import { useMemo } from 'react';

export const useEmployees = () => {
  const employees = useMemo(() => [
    {
      id: '1',
      nameEn: 'Sarah Ayman',
      nameAr: 'سارة أيمن',
      positionEn: 'Senior Developer',
      positionAr: 'مطور أول',
      departmentEn: 'Technology',
      departmentAr: 'التكنولوجيا',
      email: 'sarah.a@company.com',
      phone: '+1 (555) 123-4567',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    {
      id: '2',
      nameEn: 'Ahmed Hassan',
      nameAr: 'أحمد حسن',
      positionEn: 'Product Manager',
      positionAr: 'مدير المنتج',
      departmentEn: 'Product',
      departmentAr: 'المنتجات',
      email: 'ahmed.h@company.com',
      phone: '+1 (555) 234-5678',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    }
  ], []);

  return { employees };
};