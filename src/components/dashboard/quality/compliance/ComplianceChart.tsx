import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { PieChart, BarChart2, TrendingUp } from 'lucide-react';

export const ComplianceChart: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // Mock compliance data
  const complianceData = {
    overall: 92,
    categories: [
      { nameEn: 'Safety Standards', nameAr: 'معايير السلامة', compliance: 95 },
      { nameEn: 'Quality Control', nameAr: 'مراقبة الجودة', compliance: 88 },
      { nameEn: 'Documentation', nameAr: 'التوثيق', compliance: 94 },
      { nameEn: 'Training', nameAr: 'التدريب', compliance: 85 }
    ],
    trends: [
      { period: 'Q1', value: 85 },
      { period: 'Q2', value: 88 },
      { period: 'Q3', value: 90 },
      { period: 'Q4', value: 92 }
    ]
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Overall Compliance Score */}
      <div className="bg-indigo-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <PieChart className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <h4 className="font-medium text-gray-900">
              {isRTL ? 'معدل الامتثال العام' : 'Overall Compliance Rate'}
            </h4>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600">+5%</span>
          </div>
        </div>
        <div className="relative pt-2">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-indigo-600">
                {complianceData.overall}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-3 text-xs flex rounded-full bg-indigo-200">
            <div
              style={{ width: `${complianceData.overall}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <BarChart2 className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h4 className="font-medium text-gray-900">
            {isRTL ? 'تحليل الامتثال حسب الفئة' : 'Compliance Analysis by Category'}
          </h4>
        </div>
        <div className="space-y-4">
          {complianceData.categories.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {isRTL ? category.nameAr : category.nameEn}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {category.compliance}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    category.compliance >= 90 ? 'bg-green-600' :
                    category.compliance >= 80 ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}
                  style={{ width: `${category.compliance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quarterly Trends */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center mb-6">
          <TrendingUp className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h4 className="font-medium text-gray-900">
            {isRTL ? 'اتجاهات الامتثال' : 'Compliance Trends'}
          </h4>
        </div>
        <div className="relative h-48">
          <div className="absolute inset-0 flex items-end justify-between">
            {complianceData.trends.map((trend, index) => (
              <div key={index} className="flex flex-col items-center w-1/4">
                <div className="relative w-full px-2">
                  <div
                    className="w-full bg-indigo-200 rounded-t transition-all duration-500"
                    style={{ height: `${trend.value}%` }}
                  >
                    <div
                      className="absolute bottom-0 w-full bg-indigo-600 rounded-t transition-all duration-500"
                      style={{ height: `${trend.value}%` }}
                    />
                  </div>
                </div>
                <span className="mt-2 text-sm text-gray-600">{trend.period}</span>
                <span className="text-sm font-medium text-gray-900">{trend.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">
          {isRTL ? 'التوصيات والتحسينات' : 'Recommendations & Improvements'}
        </h4>
        <ul className="space-y-3">
          {[
            {
              titleEn: 'Update safety training materials',
              titleAr: 'تحديث مواد تدريب السلامة',
              priorityEn: 'High Priority',
              priorityAr: 'أولوية عالية'
            },
            {
              titleEn: 'Enhance documentation processes',
              titleAr: 'تحسين عمليات التوثيق',
              priorityEn: 'Medium Priority',
              priorityAr: 'أولوية متوسطة'
            }
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-indigo-600" />
              <div className={`flex-1 ${isRTL ? 'mr-3' : 'ml-3'}`}>
                <p className="text-gray-900">
                  {isRTL ? item.titleAr : item.titleEn}
                </p>
                <span className="text-sm text-gray-500">
                  {isRTL ? item.priorityAr : item.priorityEn}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};