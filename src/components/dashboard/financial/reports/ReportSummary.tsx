import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useFinancialSummary } from '../../../../hooks/useFinancialSummary';

export const ReportSummary: React.FC = () => {
  const { language } = useLanguage();
  const { summary } = useFinancialSummary();
  const isRTL = language === 'ar';

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-600">
          {isRTL ? 'الإيرادات' : 'Income'}
        </p>
        <p className="text-xl font-bold text-green-700">
          ${summary.income.toLocaleString()}
        </p>
      </div>
      <div className="p-3 bg-red-50 rounded-lg">
        <p className="text-sm text-red-600">
          {isRTL ? 'المصروفات' : 'Expenses'}
        </p>
        <p className="text-xl font-bold text-red-700">
          ${summary.expenses.toLocaleString()}
        </p>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-600">
          {isRTL ? 'الرصيد' : 'Balance'}
        </p>
        <p className="text-xl font-bold text-blue-700">
          ${summary.balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
};