import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { TrendingUp, Target, Users } from 'lucide-react';

export const PerformanceMetrics = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const metrics = [
    {
      icon: Target,
      valueEn: '92%',
      valueAr: '٩٢٪',
      labelEn: 'Goals Achieved',
      labelAr: 'الأهداف المحققة',
      trend: '+5%'
    },
    {
      icon: Users,
      valueEn: '85%',
      valueAr: '٨٥٪',
      labelEn: 'Team Performance',
      labelAr: 'أداء الفريق',
      trend: '+3%'
    },
    {
      icon: TrendingUp,
      valueEn: '78%',
      valueAr: '٧٨٪',
      labelEn: 'Growth Rate',
      labelAr: 'معدل النمو',
      trend: '+8%'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'مؤشرات الأداء' : 'Performance Metrics'}
      </h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-indigo-600" />
                <span className="text-sm text-green-600">{metric.trend}</span>
              </div>
              <p className="mt-2 text-2xl font-bold">
                {isRTL ? metric.valueAr : metric.valueEn}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {isRTL ? metric.labelAr : metric.labelEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};