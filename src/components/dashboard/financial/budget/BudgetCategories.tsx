import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useBudget } from '../../../../hooks/useBudget';

export const BudgetCategories = () => {
  const { language } = useLanguage();
  const { categories } = useBudget();
  const isRTL = language === 'ar';

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${isRTL ? 'ر.س' : 'SAR'}`;
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'فئات الميزانية' : 'Budget Categories'}
      </h3>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{isRTL ? category.nameAr : category.nameEn}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(category.spent / category.allocated) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {formatCurrency(category.spent)} / {formatCurrency(category.allocated)}
              </p>
              <p className="text-sm text-gray-500">
                {Math.round((category.spent / category.allocated) * 100)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};