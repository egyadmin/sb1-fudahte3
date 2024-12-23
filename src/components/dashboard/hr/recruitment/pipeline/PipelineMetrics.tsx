import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { TrendingUp, Users, Clock } from 'lucide-react';

export const PipelineMetrics = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const metrics = [
    {
      icon: Users,
      valueEn: '31',
      valueAr: '٣١',
      labelEn: 'Total Candidates',
      labelAr: 'إجمالي المرشحين',
      trend: '+8%'
    },
    {
      icon: Clock,
      valueEn: '15',
      valueAr: '١٥',
      labelEn: 'Average Time',
      labelAr: 'الوقت المتوسط',
      trend: '-12%'
    },
    {
      icon: TrendingUp,
      valueEn: '85%',
      valueAr: '٨٥٪',
      labelEn: 'Success Rate',
      labelAr: 'معدل النجاح',
      trend: '+5%'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Icon className="w-5 h-5 text-indigo-600" />
              <span className={`text-sm ${
                metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend}
              </span>
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
  );
};