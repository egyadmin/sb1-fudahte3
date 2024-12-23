import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Shield, Plus } from 'lucide-react';
import { ComplianceMetrics } from './ComplianceMetrics';
import { ComplianceChart } from './ComplianceChart';
import { useCompliance } from '../../../../hooks/useCompliance';

interface ComplianceDashboardProps {
  onAddStandard: () => void;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({ onAddStandard }) => {
  const { language } = useLanguage();
  const { metrics } = useCompliance();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Shield className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-semibold">
            {isRTL ? 'لوحة معلومات الامتثال' : 'Compliance Dashboard'}
          </h2>
        </div>
        <button
          onClick={onAddStandard}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة معيار' : 'Add Standard'}
        </button>
      </div>

      {/* Compliance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'معدل الامتثال العام' : 'Overall Compliance Rate'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">92%</div>
          <div className="text-sm text-green-600 mt-1">+5% {isRTL ? 'من الشهر الماضي' : 'from last month'}</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">
            {isRTL ? 'المعايير النشطة' : 'Active Standards'}
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">24</div>
          <div className="text-sm text-blue-600 mt-1">
            {isRTL ? '3 معايير جديدة' : '3 new standards'}
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-purple-600">
            {isRTL ? 'التدقيقات المجدولة' : 'Scheduled Audits'}
          </div>
          <div className="text-2xl font-bold text-purple-700 mt-1">8</div>
          <div className="text-sm text-purple-600 mt-1">
            {isRTL ? 'خلال 30 يوم' : 'in next 30 days'}
          </div>
        </div>
      </div>

      <ComplianceMetrics metrics={metrics} />
      <ComplianceChart />

      {/* Recent Updates */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          {isRTL ? 'آخر التحديثات' : 'Recent Updates'}
        </h3>
        <div className="space-y-4">
          {[
            {
              titleEn: 'ISO 9001:2015 Certification Renewal',
              titleAr: 'تجديد شهادة الأيزو 9001:2015',
              statusEn: 'In Progress',
              statusAr: 'قيد التنفيذ',
              dateEn: 'March 15, 2024',
              dateAr: '١٥ مارس ٢٠٢٤'
            },
            {
              titleEn: 'Safety Standards Update',
              titleAr: 'تحديث معايير السلامة',
              statusEn: 'Completed',
              statusAr: 'مكتمل',
              dateEn: 'March 10, 2024',
              dateAr: '١٠ مارس ٢٠٢٤'
            }
          ].map((update, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">
                  {isRTL ? update.titleAr : update.titleEn}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {isRTL ? update.dateAr : update.dateEn}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                update.statusEn === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {isRTL ? update.statusAr : update.statusEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};