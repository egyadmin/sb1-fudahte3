import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

export const PerformanceMetrics = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-4">
        <TrendingUp className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'مؤشرات الأداء' : 'Performance Metrics'}
        </h3>
      </div>
      {/* Performance metrics content will be added here */}
    </div>
  );
};