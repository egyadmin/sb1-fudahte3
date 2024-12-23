import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { User, Clock, CheckCircle, XCircle } from 'lucide-react';

export const PipelineStages = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const stages = [
    {
      icon: User,
      titleEn: 'Application Review',
      titleAr: 'مراجعة الطلب',
      count: 15,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Clock,
      titleEn: 'Initial Interview',
      titleAr: 'المقابلة الأولية',
      count: 8,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: CheckCircle,
      titleEn: 'Technical Assessment',
      titleAr: 'التقييم التقني',
      count: 5,
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: XCircle,
      titleEn: 'Final Interview',
      titleAr: 'المقابلة النهائية',
      count: 3,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <div className="mt-6 space-y-4">
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        return (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stage.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <h4 className="font-medium">
                  {isRTL ? stage.titleAr : stage.titleEn}
                </h4>
                <p className="text-sm text-gray-500">
                  {stage.count} {isRTL ? 'مرشح' : 'candidates'}
                </p>
              </div>
            </div>
            <button className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              {isRTL ? 'عرض المرشحين' : 'View Candidates'}
            </button>
          </div>
        );
      })}
    </div>
  );
};