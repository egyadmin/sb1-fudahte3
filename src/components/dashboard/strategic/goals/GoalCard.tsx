import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

interface GoalCardProps {
  titleEn: string;
  titleAr: string;
  progressPercent: number;
  status: 'on-track' | 'at-risk' | 'behind';
}

export const GoalCard: React.FC<GoalCardProps> = ({
  titleEn,
  titleAr,
  progressPercent,
  status
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const statusConfig = {
    'on-track': {
      icon: TrendingUp,
      colorClass: 'bg-green-100 text-green-800',
      textEn: 'On Track',
      textAr: 'على المسار'
    },
    'at-risk': {
      icon: AlertCircle,
      colorClass: 'bg-yellow-100 text-yellow-800',
      textEn: 'At Risk',
      textAr: 'في خطر'
    },
    'behind': {
      icon: AlertCircle,
      colorClass: 'bg-red-100 text-red-800',
      textEn: 'Behind',
      textAr: 'متأخر'
    }
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium">{isRTL ? titleAr : titleEn}</h4>
        <div className={`flex items-center px-2 py-1 rounded-full text-sm ${statusConfig[status].colorClass}`}>
          <StatusIcon className="w-4 h-4 mr-1" />
          <span>{isRTL ? statusConfig[status].textAr : statusConfig[status].textEn}</span>
        </div>
      </div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {progressPercent}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${progressPercent}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};