import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Clock, AlertTriangle } from 'lucide-react';

export const PolicyStats = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const stats = [
    {
      icon: FileText,
      valueEn: '24',
      valueAr: '٢٤',
      labelEn: 'Active Policies',
      labelAr: 'سياسات نشطة',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Clock,
      valueEn: '5',
      valueAr: '٥',
      labelEn: 'Under Review',
      labelAr: 'قيد المراجعة',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: AlertTriangle,
      valueEn: '3',
      valueAr: '٣',
      labelEn: 'Expiring Soon',
      labelAr: 'تنتهي قريباً',
      color: 'text-red-600 bg-red-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'إحصائيات السياسات' : 'Policy Statistics'}
      </h3>
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="ml-3 text-gray-600">
                  {isRTL ? stat.labelAr : stat.labelEn}
                </span>
              </div>
              <span className="text-xl font-bold">
                {isRTL ? stat.valueAr : stat.valueEn}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};