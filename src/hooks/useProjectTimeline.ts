import { useMemo } from 'react';

export const useProjectTimeline = () => {
  const timeline = useMemo(() => [
    {
      titleEn: 'Project Initiation',
      titleAr: 'بدء المشروع',
      durationEn: 'Q1 2024 (Jan-Mar)',
      durationAr: 'الربع الأول ٢٠٢٤ (يناير-مارس)',
      statusEn: 'On Track',
      statusAr: 'في المسار',
      status: 'on-track',
      progressPercent: 85,
      milestonesEn: [
        'Project charter approval',
        'Stakeholder analysis',
        'Initial resource allocation'
      ],
      milestonesAr: [
        'اعتماد ميثاق المشروع',
        'تحليل أصحاب المصلحة',
        'التخصيص الأولي للموارد'
      ]
    },
    {
      titleEn: 'Planning & Design',
      titleAr: 'التخطيط والتصميم',
      durationEn: 'Q2 2024 (Apr-Jun)',
      durationAr: 'الربع الثاني ٢٠٢٤ (أبريل-يونيو)',
      statusEn: 'At Risk',
      statusAr: 'في خطر',
      status: 'at-risk',
      progressPercent: 45,
      milestonesEn: [
        'Detailed project plan',
        'Technical specifications',
        'Resource planning'
      ],
      milestonesAr: [
        'خطة المشروع التفصيلية',
        'المواصفات الفنية',
        'تخطيط الموارد'
      ]
    },
    {
      titleEn: 'Implementation',
      titleAr: 'التنفيذ',
      durationEn: 'Q3 2024 (Jul-Sep)',
      durationAr: 'الربع الثالث ٢٠٢٤ (يوليو-سبتمبر)',
      statusEn: 'Upcoming',
      statusAr: 'قادم',
      status: 'upcoming',
      progressPercent: 0,
      milestonesEn: [
        'Phase 1 deployment',
        'Quality assurance',
        'Progress monitoring'
      ],
      milestonesAr: [
        'نشر المرحلة الأولى',
        'ضمان الجودة',
        'مراقبة التقدم'
      ]
    },
    {
      titleEn: 'Testing & Validation',
      titleAr: 'الاختبار والتحقق',
      durationEn: 'Q4 2024 (Oct-Dec)',
      durationAr: 'الربع الرابع ٢٠٢٤ (أكتوبر-ديسمبر)',
      statusEn: 'Upcoming',
      statusAr: 'قادم',
      status: 'upcoming',
      progressPercent: 0,
      milestonesEn: [
        'System testing',
        'User acceptance',
        'Performance validation'
      ],
      milestonesAr: [
        'اختبار النظام',
        'قبول المستخدم',
        'التحقق من الأداء'
      ]
    }
  ], []);

  return { timeline };
};