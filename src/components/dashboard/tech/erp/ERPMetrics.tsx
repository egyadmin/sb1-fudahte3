import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ERPMetric {
  titleEn: string;
  titleAr: string;
  value: string | number;
  trend: string;
  status: 'positive' | 'negative';
}

interface ERPMetricsProps {
  metrics: ERPMetric[];
}

export const ERPMetrics: React.FC<ERPMetricsProps> = ({ metrics }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-1">
            {isRTL ? metric.titleAr : metric.titleEn}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{metric.value}</span>
            <div className={`flex items-center ${
              metric.status === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.status === 'positive' ? 
                <TrendingUp className="w-4 h-4 mr-1" /> : 
                <TrendingDown className="w-4 h-4 mr-1" />
              }
              <span>{metric.trend}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};