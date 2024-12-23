import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { Target, FileText, Users } from 'lucide-react';

export const PerformanceActions = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const actions = [
    {
      icon: Target,
      titleEn: 'Set Goals',
      titleAr: 'تحديد الأهداف',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    },
    {
      icon: FileText,
      titleEn: 'Review Form',
      titleAr: 'نموذج المراجعة',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      icon: Users,
      titleEn: 'Team Feedback',
      titleAr: 'تقييم الفريق',
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'إجراءات الأداء' : 'Performance Actions'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`${action.color} p-4 rounded-lg transition-all duration-200
                flex items-center justify-center space-x-2`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">
                {isRTL ? action.titleAr : action.titleEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );