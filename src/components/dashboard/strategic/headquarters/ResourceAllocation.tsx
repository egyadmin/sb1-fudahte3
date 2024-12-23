import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { DollarSign, Users, TrendingUp } from 'lucide-react';
import { useResourceAllocation } from '../../../../hooks/useResourceAllocation';

export const ResourceAllocation: React.FC = () => {
  const { language } = useLanguage();
  const { resources } = useResourceAllocation();
  const isRTL = language === 'ar';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-green-50 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <DollarSign className={`w-5 h-5 text-green-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'تخصيص الموارد' : 'Resource Allocation'}
        </h3>
      </div>

      {/* Financial Resources */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <DollarSign className={`w-4 h-4 text-green-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h4 className="font-medium text-gray-900">
            {isRTL ? 'الموارد المالية' : 'Financial Resources'}
          </h4>
        </div>
        <div className="bg-white rounded-lg p-4 space-y-4">
          {resources.financial.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">
                  {isRTL ? item.categoryAr : item.categoryEn}
                </span>
                <span className="text-green-600 font-semibold">
                  {formatCurrency(item.amount)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.amount / Math.max(...resources.financial.map(r => r.amount))) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Human Resources */}
      <div>
        <div className="flex items-center mb-4">
          <Users className={`w-4 h-4 text-green-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h4 className="font-medium text-gray-900">
            {isRTL ? 'الموارد البشرية' : 'Human Resources'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.human.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-medium text-gray-900">
                    {isRTL ? item.roleAr : item.roleEn}
                  </h5>
                  <div className="flex items-center mt-1">
                    <Users className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">
                      {item.count} {isRTL ? 'موظف' : 'employees'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{item.growth}%</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">
                    {isRTL ? 'معدل الإشغال' : 'Utilization Rate'}
                  </span>
                  <span className="font-medium">{item.utilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.utilization}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? 'إجمالي الميزانية' : 'Total Budget'}
          </div>
          <div className="text-lg font-bold text-gray-900">
            {formatCurrency(resources.financial.reduce((sum, item) => sum + item.amount, 0))}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? 'إجمالي الموظفين' : 'Total Staff'}
          </div>
          <div className="text-lg font-bold text-gray-900">
            {resources.human.reduce((sum, item) => sum + item.count, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? 'متوسط الكفاءة' : 'Avg. Efficiency'}
          </div>
          <div className="text-lg font-bold text-gray-900">
            {Math.round(resources.human.reduce((sum, item) => sum + item.utilization, 0) / resources.human.length)}%
          </div>
        </div>
      </div>
    </div>
  );
};