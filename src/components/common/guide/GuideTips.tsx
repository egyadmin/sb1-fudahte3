import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Lightbulb } from 'lucide-react';

export const GuideTips = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const tips = [
    {
      en: 'Clarity and Simplicity: Use unified symbols and colors for easy reading.',
      ar: 'الوضوح والبساطة: استخدم رموزًا وألوانًا موحدة لسهولة القراءة.'
    },
    {
      en: 'Show Relationships: Clarify how headquarters operations support projects and how reports flow between parties.',
      ar: 'إظهار العلاقات: أوضح كيف تدعم إدارة العمليات بالمركز الرئيسي المشاريع، وكيف تتدفق التقارير والمعلومات بين الطرفين.'
    },
    {
      en: 'Detail Critical Stages: Break down key phases like planning, execution, and quality.',
      ar: 'تفصيل المراحل الحرجة: قم بتفصيل مراحل رئيسية مثل التخطيط، التنفيذ، والجودة.'
    },
    {
      en: 'Add Decision Points: Make critical decision points clear (e.g., Are resources sufficient? Is quality met?).',
      ar: 'إضافة نقاط اتخاذ القرار: اجعل نقاط القرارات الحرجة واضحة (مثل: هل الموارد كافية؟ هل الجودة مستوفاة؟).'
    }
  ];

  return (
    <div className="bg-primary-50 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <Lightbulb className={`w-6 h-6 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-xl font-bold text-gray-900">
          {isRTL ? 'نصائح لضمان احترافية المخطط' : 'Tips for Professional Flow'}
        </h3>
      </div>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <div className={`w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'} mt-0.5`}>
              {index + 1}
            </div>
            <p className="text-gray-700">
              {isRTL ? tip.ar : tip.en}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};