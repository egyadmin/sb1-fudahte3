import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { DollarSign, TrendingUp, TrendingDown, Plus, PieChart } from 'lucide-react';
import { useBudget } from '../../../../hooks/useBudget';

interface BudgetOverviewProps {
  onAddBudget: () => void;
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({ onAddBudget }) => {
  const { language } = useLanguage();
  const { totalBudget, categories, spent, remaining, metrics } = useBudget();
  const isRTL = language === 'ar';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-semibold">
            {isRTL ? 'نظرة عامة على الميزانية' : 'Budget Overview'}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {isRTL ? 'السنة المالية' : 'Fiscal Year'} 2024
          </div>
          <button
            onClick={onAddBudget}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'إضافة فئة ميزانية' : 'Add Budget Category'}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="text-sm text-indigo-600 mb-1">
            {isRTL ? 'إجمالي الميزانية' : 'Total Budget'}
          </div>
          <div className="text-2xl font-bold text-indigo-700">
            {formatCurrency(totalBudget)}
          </div>
          <div className="flex items-center mt-2 text-sm">
            <div className={`px-2 py-1 rounded-full ${
              metrics.utilizationRate >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {metrics.utilizationRate}% {isRTL ? 'معدل الاستخدام' : 'Utilization'}
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600 mb-1">
            {isRTL ? 'المصروفات' : 'Spent'}
          </div>
          <div className="text-2xl font-bold text-green-700">
            {formatCurrency(spent)}
          </div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            {metrics.savingsRate}% {isRTL ? 'معدل التوفير' : 'Savings Rate'}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600 mb-1">
            {isRTL ? 'المتبقي' : 'Remaining'}
          </div>
          <div className="text-2xl font-bold text-blue-700">
            {formatCurrency(remaining)}
          </div>
          <div className="flex items-center mt-2 text-sm">
            <div className={`px-2 py-1 rounded-full ${
              metrics.variancePercent > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {metrics.variancePercent > 0 ? '+' : ''}{metrics.variancePercent}% {isRTL ? 'التباين' : 'Variance'}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Breakdown */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-4">
          {isRTL ? 'تفصيل الميزانية حسب الفئة' : 'Budget Breakdown by Category'}
        </h3>
        {categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">
                  {isRTL ? category.nameAr : category.nameEn}
                </h4>
                <div className="text-sm text-gray-500">
                  {formatCurrency(category.spent)} / {formatCurrency(category.allocated)}
                </div>
              </div>
              <div className="flex items-center">
                {category.trend.startsWith('+') ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={category.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {category.trend}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(category.spent / category.allocated) * 100}%` }}
              />
            </div>
            {/* Subcategories */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              {category.subcategories.map((sub, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-2">
                  <div className="text-sm font-medium">
                    {isRTL ? sub.nameAr : sub.nameEn}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(sub.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Forecast Accuracy */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">
              {isRTL ? 'دقة التوقعات' : 'Forecast Accuracy'}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {isRTL ? 'بناءً على البيانات التاريخية' : 'Based on historical data'}
            </p>
          </div>
          <div className="text-2xl font-bold text-indigo-600">
            {metrics.forecastAccuracy}%
          </div>
        </div>
      </div>
    </div>
  );
};