import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface InnovationMetricProps {
  titleEn: string;
  titleAr: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const InnovationMetric: React.FC<InnovationMetricProps> = ({
  titleEn,
  titleAr,
  value,
  trend,
  icon,
  className = ''
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const isPositive = trend?.startsWith('+');

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon && <div className="p-2 bg-indigo-50 rounded-lg">{icon}</div>}
          <h3 className={`text-sm font-medium text-gray-600 ${icon ? 'ml-3' : ''}`}>
            {isRTL ? titleAr : titleEn}
          </h3>
        </div>
        {trend && (
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            <span className="text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};