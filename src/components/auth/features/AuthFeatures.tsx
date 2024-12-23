import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Target, BarChart2, Users, Settings } from 'lucide-react';

export const AuthFeatures = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const features = [
    { icon: Target, titleEn: 'Strategic Planning', titleAr: 'التخطيط الاستراتيجي' },
    { icon: BarChart2, titleEn: 'Performance Tracking', titleAr: 'تتبع الأداء' },
    { icon: Users, titleEn: 'Team Management', titleAr: 'إدارة الفريق' },
    { icon: Settings, titleEn: 'Process Optimization', titleAr: 'تحسين العمليات' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div key={index} className="flex items-center p-3 bg-white/5 rounded-lg">
            <Icon className={`w-5 h-5 text-primary-200 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <span className="text-sm text-white">
              {isRTL ? feature.titleAr : feature.titleEn}
            </span>
          </div>
        );
      })}
    </div>
  );
};