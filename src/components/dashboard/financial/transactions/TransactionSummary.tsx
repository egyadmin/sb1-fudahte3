import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export const TransactionSummary: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const summary = {
    income: 850000,
    expenses: 650000,
    growth: 12.5
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowUpRight className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm text-green-600">
              {isRTL ? 'الإيرادات' : 'Income'}
            </span>
          </div>
        </div>
        <p className="text-2xl font-bold text-green-700 mt-2">
          {formatCurrency(summary.income)}
        </p>
      </div>

      <div className="bg-red-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowDownRight className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm text-red-600">
              {isRTL ? 'المصروفات' : 'Expenses'}
            </span>
          </div>
        </div>
        <p className="text-2xl font-bold text-red-700 mt-2">
          {formatCurrency(summary.expenses)}
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm text-blue-600">
              {isRTL ? 'النمو' : 'Growth'}
            </span>
          </div>
        </div>
        <p className="text-2xl font-bold text-blue-700 mt-2">
          +{summary.growth}%
        </p>
      </div>
    </div>
  );
};