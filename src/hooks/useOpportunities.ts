import { useMemo } from 'react';

export const useOpportunities = () => {
  const opportunities = useMemo(() => [
    {
      id: '1',
      titleEn: 'AI-Powered Customer Service',
      titleAr: 'خدمة العملاء المدعومة بالذكاء الاصطناعي',
      descriptionEn: 'Implement AI chatbots for 24/7 customer support',
      descriptionAr: 'تنفيذ روبوتات الدردشة الذكية لدعم العملاء على مدار الساعة',
      statusEn: 'Under Review',
      statusAr: 'قيد المراجعة',
      impact: 'high',
      score: 85
    },
    {
      id: '2',
      titleEn: 'Blockchain Integration',
      titleAr: 'دمج تقنية البلوكتشين',
      descriptionEn: 'Secure transaction system using blockchain',
      descriptionAr: 'نظام معاملات آمن باستخدام البلوكتشين',
      statusEn: 'In Progress',
      statusAr: 'قيد التنفيذ',
      impact: 'medium',
      score: 75
    }
  ], []);

  return { opportunities };
};