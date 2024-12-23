import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp, Clock, Users, CheckCircle } from 'lucide-react';

export const RecruitmentMetrics = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const metrics = [
    {
      icon: Users,
      valueEn: '45',
      valueAr: '٤٥',
      labelEn: 'Active Applications',
      labelAr: 'طلبات نشطة',
      trend: '+12%'
    },
    {
      icon: Clock,
      valueEn: '18',
      valueAr: '١٨',
      labelEn: 'Days to Hire',
      labelAr: 'أيام التوظيف',
      trend: '-5%'
    },
    {
      icon: CheckCircle,
      valueEn: '8',
      valueAr: '٨',
      labelEn: 'Positions Filled',
      labelAr: 'وظائف تم شغلها',
      trend: '+3%'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className="w-5 h-5 text-indigo-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    {isRTL ? metric.labelAr : metric.labelEn}
                  </span>
                </div>
                <span className={`text-sm ${
                  metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend}
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {isRTL ? metric.valueAr : metric.valueEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};