import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useBudgetTrends } from '../../../../hooks/useBudgetTrends';

export const BudgetTrends: React.FC = () => {
  const { language } = useLanguage();
  const { trends } = useBudgetTrends();
  const isRTL = language === 'ar';

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-700 mb-4">
        {isRTL ? 'اتجاهات الميزانية' : 'Budget Trends'}
      </h4>
      <div className="space-y-3">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium">
                {isRTL ? trend.categoryAr : trend.categoryEn}
              </span>
              <div className="text-xs text-gray-500 mt-1">
                {isRTL ? trend.periodAr : trend.periodEn}
              </div>
            </div>
            <div className={`flex items-center ${
              trend.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.change >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {trend.change >= 0 ? '+' : ''}{trend.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};