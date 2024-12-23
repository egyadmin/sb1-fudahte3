import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { 
  ArrowRight, ArrowLeft, Mouse, Click, 
  LayoutDashboard, Users, Target, DollarSign,
  ShoppingCart, Shield, Cpu, Scale, Lightbulb,
  FileText, Globe, LogOut
} from 'lucide-react';

export const SystemGuide: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const sections = [
    {
      titleEn: 'Navigation',
      titleAr: 'التنقل',
      icon: LayoutDashboard,
      stepsEn: [
        'Use the sidebar menu to navigate between different sections',
        'Click on any menu item to view its content',
        'The active section will be highlighted in blue'
      ],
      stepsAr: [
        'استخدم القائمة الجانبية للتنقل بين الأقسام المختلفة',
        'انقر على أي عنصر في القائمة لعرض محتواه',
        'سيتم تمييز القسم النشط باللون الأزرق'
      ]
    },
    {
      titleEn: 'Main Sections',
      titleAr: 'الأقسام الرئيسية',
      icon: Target,
      sections: [
        { icon: LayoutDashboard, titleEn: 'Dashboard', titleAr: 'لوحة القيادة' },
        { icon: Target, titleEn: 'Strategic Planning', titleAr: 'التخطيط الاستراتيجي' },
        { icon: Users, titleEn: 'HR Management', titleAr: 'إدارة الموارد البشرية' },
        { icon: DollarSign, titleEn: 'Financial Management', titleAr: 'الإدارة المالية' },
        { icon: ShoppingCart, titleEn: 'Procurement', titleAr: 'المشتريات' },
        { icon: Shield, titleEn: 'Quality & Safety', titleAr: 'الجودة والسلامة' },
        { icon: Cpu, titleEn: 'Tech Operations', titleAr: 'العمليات التقنية' },
        { icon: Scale, titleEn: 'Legal Compliance', titleAr: 'الامتثال القانوني' },
        { icon: Lightbulb, titleEn: 'Innovation', titleAr: 'الابتكار' },
        { icon: FileText, titleEn: 'Reports', titleAr: 'التقارير' }
      ]
    },
    {
      titleEn: 'Common Actions',
      titleAr: 'الإجراءات الشائعة',
      icon: Mouse,
      actionsEn: [
        'Click the + button to add new items',
        'Use the search bar to find specific content',
        'Click on items to view details',
        'Use form fields to enter information',
        'Click Save to confirm changes'
      ],
      actionsAr: [
        'انقر على زر + لإضافة عناصر جديدة',
        'استخدم شريط البحث للعثور على محتوى محدد',
        'انقر على العناصر لعرض التفاصيل',
        'استخدم حقول النموذج لإدخال المعلومات',
        'انقر على حفظ لتأكيد التغييرات'
      ]
    },
    {
      titleEn: 'System Controls',
      titleAr: 'عناصر التحكم',
      icon: Click,
      controlsEn: [
        { icon: Globe, text: 'Language toggle (English/Arabic)' },
        { icon: LogOut, text: 'Sign out button' }
      ],
      controlsAr: [
        { icon: Globe, text: 'تبديل اللغة (الإنجليزية/العربية)' },
        { icon: LogOut, text: 'زر تسجيل الخروج' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Icon className={`w-6 h-6 text-primary-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
              <h2 className="text-xl font-semibold">
                {isRTL ? section.titleAr : section.titleEn}
              </h2>
            </div>

            {section.stepsEn && (
              <div className="space-y-3">
                {(isRTL ? section.stepsAr : section.stepsEn).map((step, i) => (
                  <div key={i} className="flex items-start">
                    <Arrow className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'} mt-0.5`} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}

            {section.sections && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {section.sections.map((subsection, i) => {
                  const SubIcon = subsection.icon;
                  return (
                    <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <SubIcon className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span>{isRTL ? subsection.titleAr : subsection.titleEn}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {section.actionsEn && (
              <div className="space-y-3">
                {(isRTL ? section.actionsAr : section.actionsEn).map((action, i) => (
                  <div key={i} className="flex items-start">
                    <Arrow className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'} mt-0.5`} />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            )}

            {section.controlsEn && (
              <div className="grid grid-cols-2 gap-4">
                {(isRTL ? section.controlsAr : section.controlsEn).map((control, i) => {
                  const ControlIcon = control.icon;
                  return (
                    <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <ControlIcon className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span>{control.text}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};