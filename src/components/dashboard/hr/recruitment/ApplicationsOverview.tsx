import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { User, Clock, CheckCircle, XCircle } from 'lucide-react';

export const ApplicationsOverview = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const stages = [
    {
      icon: User,
      titleEn: 'New Applications',
      titleAr: 'طلبات جديدة',
      count: 12,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Clock,
      titleEn: 'In Review',
      titleAr: 'قيد المراجعة',
      count: 8,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: CheckCircle,
      titleEn: 'Shortlisted',
      titleAr: 'القائمة المختصرة',
      count: 5,
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: XCircle,
      titleEn: 'Rejected',
      titleAr: 'مرفوض',
      count: 3,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'نظرة عامة على الطلبات' : 'Applications Overview'}
      </h3>
      <div className="space-y-3">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stage.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="ml-3 font-medium">
                  {isRTL ? stage.titleAr : stage.titleEn}
                </span>
              </div>
              <span className="text-lg font-semibold">{stage.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};