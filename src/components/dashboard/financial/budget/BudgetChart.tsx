import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { PieChart } from 'lucide-react';

export const BudgetChart: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center mb-4">
        <PieChart className={`w-4 h-4 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h4 className="text-sm font-medium text-gray-700">
          {isRTL ? 'تحليل الميزانية' : 'Budget Analysis'}
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <h5 className="text-sm text-indigo-600 mb-2">
            {isRTL ? 'استخدام الميزانية' : 'Budget Utilization'}
          </h5>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-indigo-600">65%</span>
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
              <div
                style={{ width: '65%' }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
              />
            </div>
          </div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h5 className="text-sm text-green-600 mb-2">
            {isRTL ? 'التوفير المتوقع' : 'Projected Savings'}
          </h5>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-green-600">35%</span>
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
              <div
                style={{ width: '35%' }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};