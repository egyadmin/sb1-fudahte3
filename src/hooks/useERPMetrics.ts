import { useMemo } from 'react';

export const useERPMetrics = () => {
  const metrics = useMemo(() => [
    {
      titleEn: 'Active Users',
      titleAr: 'المستخدمين النشطين',
      value: 1234,
      trend: '+12%',
      status: 'positive'
    },
    {
      titleEn: 'System Load',
      titleAr: 'تحميل النظام',
      value: '68%',
      trend: '-5%',
      status: 'positive'
    },
    {
      titleEn: 'Response Time',
      titleAr: 'وقت الاستجابة',
      value: '0.8s',
      trend: '-15%',
      status: 'positive'
    }
  ], []);

  const activities = useMemo(() => [
    {
      id: '1',
      moduleEn: 'Finance',
      moduleAr: 'المالية',
      actionEn: 'Monthly Close Process',
      actionAr: 'عملية الإغلاق الشهري',
      userEn: 'Sarah Johnson',
      userAr: 'سارة جونسون',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      moduleEn: 'Inventory',
      moduleAr: 'المخزون',
      actionEn: 'Stock Update',
      actionAr: 'تحديث المخزون',
      userEn: 'Mohammed Ali',
      userAr: 'محمد علي',
      timestamp: new Date().toISOString()
    }
  ], []);

  return { metrics, activities };
};