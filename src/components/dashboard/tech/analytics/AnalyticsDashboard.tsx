import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { BarChart2, Plus, TrendingUp } from 'lucide-react';
import { useAnalytics } from '../../../../hooks/useAnalytics';
import { AnalyticsSummary } from './AnalyticsSummary';
import { AnalyticsChart } from './AnalyticsChart';

interface AnalyticsDashboardProps {
  onAddMetric: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ onAddMetric }) => {
  const { language } = useLanguage();
  const { metrics } = useAnalytics();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart2 className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'لوحة التحليلات' : 'Analytics Dashboard'}
          </h3>
        </div>
        <button
          onClick={onAddMetric}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة مقياس' : 'Add Metric'}
        </button>
      </div>

      {/* Analytics Summary */}
      <AnalyticsSummary />

      {/* Performance Metrics */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-900 mb-4">
          {isRTL ? 'مؤشرات الأداء' : 'Performance Metrics'}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { titleEn: 'System Uptime', titleAr: 'وقت تشغيل النظام', value: '99.9%', trend: '+0.2%' },
            { titleEn: 'Response Time', titleAr: 'وقت الاستجابة', value: '0.8s', trend: '-15%' },
            { titleEn: 'Error Rate', titleAr: 'معدل الخطأ', value: '0.05%', trend: '-25%' },
            { titleEn: 'User Satisfaction', titleAr: 'رضا المستخدم', value: '4.8/5', trend: '+0.3' }
          ].map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-medium text-gray-900">
                  {isRTL ? metric.titleAr : metric.titleEn}
                </h5>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">{metric.trend}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-indigo-600 mt-2">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Chart */}
      <AnalyticsChart />

      {/* Usage Statistics */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-900 mb-4">
          {isRTL ? 'إحصائيات الاستخدام' : 'Usage Statistics'}
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            { titleEn: 'Active Users', titleAr: 'المستخدمين النشطين', value: '1,234', change: '+12%' },
            { titleEn: 'Daily Sessions', titleAr: 'الجلسات اليومية', value: '3,567', change: '+8%' },
            { titleEn: 'Data Processed', titleAr: 'البيانات المعالجة', value: '2.5TB', change: '+15%' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">
                {isRTL ? stat.titleAr : stat.titleEn}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};