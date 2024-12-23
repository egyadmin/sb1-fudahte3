import { useMemo } from 'react';

interface SiteReport {
  titleEn: string;
  titleAr: string;
  siteEn: string;
  siteAr: string;
  dateEn: string;
  dateAr: string;
  priorityEn: string;
  priorityAr: string;
  priority: 'high' | 'medium' | 'low';
}

export const useSiteReports = () => {
  const reports = useMemo<SiteReport[]>(() => [
    {
      titleEn: 'Safety Incident Report',
      titleAr: 'تقرير حادث السلامة',
      siteEn: 'Main Construction Site',
      siteAr: 'موقع البناء الرئيسي',
      dateEn: 'March 15, 2024',
      dateAr: '١٥ مارس ٢٠٢٤',
      priorityEn: 'High Priority',
      priorityAr: 'أولوية عالية',
      priority: 'high'
    },
    {
      titleEn: 'Resource Shortage Alert',
      titleAr: 'تنبيه نقص الموارد',
      siteEn: 'Eastern Facility',
      siteAr: 'المنشأة الشرقية',
      dateEn: 'March 14, 2024',
      dateAr: '١٤ مارس ٢٠٢٤',
      priorityEn: 'Medium Priority',
      priorityAr: 'أولوية متوسطة',
      priority: 'medium'
    }
  ], []);

  return { reports };
};