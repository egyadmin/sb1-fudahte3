import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ComplianceMetric {
  titleEn: string;
  titleAr: string;
  value: number;
  total: number;
  status: 'compliant' | 'partial' | 'non-compliant';
}

interface ComplianceMetricsProps {
  metrics: ComplianceMetric[];
}

export const ComplianceMetrics: React.FC<ComplianceMetricsProps> = ({ metrics }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const getStatusIcon = (status: ComplianceMetric['status']) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'partial':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'non-compliant':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">
              {isRTL ? metric.titleAr : metric.titleEn}
            </h3>
            {getStatusIcon(metric.status)}
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold">{metric.value}</span>
            <span className="text-gray-500 ml-1">/ {metric.total}</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                metric.status === 'compliant' ? 'bg-green-500' :
                metric.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${(metric.value / metric.total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};