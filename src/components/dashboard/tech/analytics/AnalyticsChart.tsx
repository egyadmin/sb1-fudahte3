import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

export const AnalyticsChart: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center mb-4">
        <TrendingUp className={`w-4 h-4 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h4 className="text-sm font-medium text-gray-700">
          {isRTL ? 'تحليل الأداء' : 'Performance Analysis'}
        </h4>
      </div>
      <div className="h-64 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-sm">
            {isRTL ? 'الرسم البياني قيد التطوير' : 'Chart under development'}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {isRTL ? 'سيتم إضافة الرسوم البيانية التفاعلية قريباً' : 'Interactive charts coming soon'}
          </p>
        </div>
      </div>
    </div>
  );
};