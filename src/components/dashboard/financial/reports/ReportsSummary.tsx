import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useFinancialSummary } from '../../../../hooks/useFinancialSummary';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const ReportsSummary: React.FC = () => {
  const { language } = useLanguage();
  const { summary } = useFinancialSummary();
  const isRTL = language === 'ar';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-600">
            {isRTL ? 'الإيرادات' : 'Income'}
          </span>
          <TrendingUp className="w-4 h-4 text-green-600" />
        </div>
        <p className="text-xl font-bold text-green-700 mt-2">
          {formatCurrency(summary.income)}
        </p>
      </div>

      <div className="bg-red-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-red-600">
            {isRTL ? 'المصروفات' : 'Expenses'}
          </span>
          <TrendingDown className="w-4 h-4 text-red-600" />
        </div>
        <p className="text-xl font-bold text-red-700 mt-2">
          {formatCurrency(summary.expenses)}
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600">
            {isRTL ? 'الرصيد' : 'Balance'}
          </span>
          <DollarSign className="w-4 h-4 text-blue-600" />
        </div>
        <p className="text-xl font-bold text-blue-700 mt-2">
          {formatCurrency(summary.balance)}
        </p>
      </div>
    </div>
  );
};