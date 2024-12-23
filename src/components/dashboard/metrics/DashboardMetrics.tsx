import React from 'react';
import { MetricCard } from './MetricCard';
import { BarChart2, Users, DollarSign, Target } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { PerformanceChart } from '../charts/PerformanceChart';

export const DashboardMetrics = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const metrics = [
    {
      icon: BarChart2,
      titleEn: 'Overall Performance',
      titleAr: 'الأداء العام',
      value: '92%',
      trend: '+8%',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      icon: Users,
      titleEn: 'Team Efficiency',
      titleAr: 'كفاءة الفريق',
      value: '95%',
      trend: '+12%',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      icon: DollarSign,
      titleEn: 'Budget Utilization',
      titleAr: 'استخدام الميزانية',
      value: '78%',
      trend: '-3%',
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
    },
    {
      icon: Target,
      titleEn: 'Goals Achieved',
      titleAr: 'الأهداف المحققة',
      value: '88%',
      trend: '+15%',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {isRTL ? 'المؤشرات الرئيسية' : 'Key Metrics'}
        </h2>
        <div className="text-sm text-gray-500">
          {isRTL ? 'آخر تحديث:' : 'Last updated:'} {' '}
          <span className="font-medium">
            {new Date().toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            {...metric}
          />
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <PerformanceChart />
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {isRTL ? 'ملخص الأداء' : 'Performance Summary'}
          </h3>
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            {isRTL ? 'أداء متميز' : 'Excellent Performance'}
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          {isRTL 
            ? 'المؤشرات تظهر تحسناً في معظم المجالات مع فرص للتحسين في إدارة الميزانية. معدلات الأداء والكفاءة تتجاوز المستهدف، مع الحاجة إلى مراقبة وتحسين استخدام الميزانية.'
            : 'Metrics show improvement across most areas with opportunities for enhancement in budget management. Performance and efficiency rates exceed targets, while budget utilization requires monitoring and optimization.'}
        </p>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">
              {isRTL ? 'نقاط القوة' : 'Strengths'}
            </h4>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                {isRTL ? 'كفاءة الفريق تتجاوز التوقعات (+12%)' : 'Team efficiency exceeds expectations (+12%)'}
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                {isRTL ? 'تحقيق الأهداف بمعدل متسارع (+15%)' : 'Accelerated goal achievement (+15%)'}
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">
              {isRTL ? 'فرص التحسين' : 'Improvement Areas'}
            </h4>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></div>
                {isRTL ? 'تحسين استخدام الميزانية (-3%)' : 'Budget utilization optimization (-3%)'}
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></div>
                {isRTL ? 'تعزيز كفاءة إدارة التكاليف' : 'Enhance cost management efficiency'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};