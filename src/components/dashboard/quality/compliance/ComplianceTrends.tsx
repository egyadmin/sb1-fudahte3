import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from 'lucide-react';

export const ComplianceTrends = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // Mock trends data
  const trends = {
    overall: {
      current: 92,
      previous: 87,
      change: '+5%'
    },
    categories: [
      {
        nameEn: 'Safety Standards',
        nameAr: 'معايير السلامة',
        current: 95,
        previous: 90,
        change: '+5%',
        status: 'improved'
      },
      {
        nameEn: 'Quality Control',
        nameAr: 'مراقبة الجودة',
        current: 88,
        previous: 85,
        change: '+3%',
        status: 'improved'
      },
      {
        nameEn: 'Documentation',
        nameAr: 'التوثيق',
        current: 94,
        previous: 88,
        change: '+6%',
        status: 'improved'
      },
      {
        nameEn: 'Training',
        nameAr: 'التدريب',
        current: 85,
        previous: 87,
        change: '-2%',
        status: 'declined'
      }
    ],
    historicalData: [
      { month: 'Oct', value: 85 },
      { month: 'Nov', value: 87 },
      { month: 'Dec', value: 88 },
      { month: 'Jan', value: 90 },
      { month: 'Feb', value: 91 },
      { month: 'Mar', value: 92 }
    ]
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Overall Trend */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Activity className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <h3 className="font-medium text-gray-900">
              {isRTL ? 'اتجاه الامتثال العام' : 'Overall Compliance Trend'}
            </h3>
          </div>
          <div className="flex items-center text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{trends.overall.change}</span>
          </div>
        </div>

        {/* Historical Chart */}
        <div className="relative h-40 mt-4">
          <div className="absolute inset-0 flex items-end justify-between">
            {trends.historicalData.map((point, index) => (
              <div key={index} className="flex flex-col items-center w-1/6">
                <div className="relative w-full px-2">
                  <div
                    className="w-full bg-indigo-600 rounded-t transition-all duration-500"
                    style={{ height: `${point.value}%` }}
                  />
                </div>
                <span className="mt-2 text-sm text-gray-600">{point.month}</span>
                <span className="text-sm font-medium">{point.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Trends */}
      <div className="grid grid-cols-2 gap-4">
        {trends.categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-900">
                {isRTL ? category.nameAr : category.nameEn}
              </h4>
              <div className={`flex items-center ${
                category.status === 'improved' ? 'text-green-600' : 'text-red-600'
              }`}>
                {category.status === 'improved' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span>{category.change}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  {isRTL ? 'المعدل الحالي' : 'Current Rate'}
                </span>
                <span className="font-medium">{category.current}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    category.status === 'improved' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${category.current}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">
                  {isRTL ? 'المعدل السابق' : 'Previous Rate'}
                </span>
                <span className="text-gray-600">{category.previous}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts and Recommendations */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <AlertTriangle className={`w-5 h-5 text-yellow-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="font-medium text-gray-900">
            {isRTL ? 'التنبيهات والتوصيات' : 'Alerts & Recommendations'}
          </h3>
        </div>

        <div className="space-y-4">
          {[
            {
              titleEn: 'Training Compliance Declining',
              titleAr: 'تراجع الامتثال في التدريب',
              descriptionEn: 'Training compliance has decreased by 2%. Review training programs and schedule refresher courses.',
              descriptionAr: 'انخفض الامتثال في التدريب بنسبة 2٪. مراجعة برامج التدريب وجدولة دورات تنشيطية.',
              priority: 'high'
            },
            {
              titleEn: 'Documentation Improvement',
              titleAr: 'تحسين التوثيق',
              descriptionEn: 'Documentation compliance shows strong improvement. Maintain current practices.',
              descriptionAr: 'يظهر الامتثال في التوثيق تحسناً قوياً. الحفاظ على الممارسات الحالية.',
              priority: 'low'
            }
          ].map((alert, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${
                alert.priority === 'high' ? 'bg-red-50' : 'bg-green-50'
              }`}
            >
              <h4 className={`font-medium ${
                alert.priority === 'high' ? 'text-red-800' : 'text-green-800'
              }`}>
                {isRTL ? alert.titleAr : alert.titleEn}
              </h4>
              <p className={`mt-1 text-sm ${
                alert.priority === 'high' ? 'text-red-600' : 'text-green-600'
              }`}>
                {isRTL ? alert.descriptionAr : alert.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};