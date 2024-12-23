import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Database, Plus, Activity } from 'lucide-react';
import { useERPMetrics } from '../../../../hooks/useERPMetrics';
import { ERPMetrics } from './ERPMetrics';
import { ERPActivityLog } from './ERPActivityLog';

interface ERPUsageProps {
  onAddEntry: () => void;
}

export const ERPUsage: React.FC<ERPUsageProps> = ({ onAddEntry }) => {
  const { language } = useLanguage();
  const { metrics, activities } = useERPMetrics();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Database className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-semibold">
            {isRTL ? 'استخدام نظام ERP' : 'ERP System Usage'}
          </h2>
        </div>
        <button
          onClick={onAddEntry}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة إدخال' : 'Add Entry'}
        </button>
      </div>

      {/* ERP Metrics */}
      <ERPMetrics metrics={metrics} />

      {/* System Health */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          {isRTL ? 'صحة النظام' : 'System Health'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { titleEn: 'CPU Usage', titleAr: 'استخدام المعالج', value: '45%', status: 'good' },
            { titleEn: 'Memory', titleAr: 'الذاكرة', value: '68%', status: 'warning' },
            { titleEn: 'Storage', titleAr: 'التخزين', value: '52%', status: 'good' }
          ].map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  {isRTL ? metric.titleAr : metric.titleEn}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  metric.status === 'good' ? 'bg-green-100 text-green-800' :
                  metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {metric.value}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric.status === 'good' ? 'bg-green-600' :
                    metric.status === 'warning' ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}
                  style={{ width: metric.value }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <ERPActivityLog activities={activities} />

      {/* Module Usage */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          {isRTL ? 'استخدام الوحدات' : 'Module Usage'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { nameEn: 'Finance', nameAr: 'المالية', usage: 92 },
            { nameEn: 'HR', nameAr: 'الموارد البشرية', usage: 88 },
            { nameEn: 'Inventory', nameAr: 'المخزون', usage: 75 },
            { nameEn: 'Reports', nameAr: 'التقارير', usage: 85 }
          ].map((module, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">
                {isRTL ? module.nameAr : module.nameEn}
              </h4>
              <div className="flex items-center mt-2">
                <Activity className="w-4 h-4 text-indigo-600 mr-2" />
                <span className="text-sm text-gray-600">{module.usage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${module.usage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};