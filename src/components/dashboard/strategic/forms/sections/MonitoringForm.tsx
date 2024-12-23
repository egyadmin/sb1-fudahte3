import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { FileText, Activity, Zap } from 'lucide-react';

export const MonitoringForm: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    siteReports: {
      titleEn: '',
      titleAr: '',
      siteEn: '',
      siteAr: '',
      priority: 'medium'
    },
    performanceReview: {
      metricEn: '',
      metricAr: '',
      target: '',
      actual: ''
    },
    improvements: {
      titleEn: '',
      titleAr: '',
      impactEn: '',
      impactAr: ''
    }
  });

  return (
    <div className="space-y-8">
      {/* Site Reports */}
      <div className="space-y-4">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'تقارير من المواقع' : 'Site Reports'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={isRTL ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
            value={formData.siteReports.titleEn}
            onChange={(e) => setFormData({
              ...formData,
              siteReports: { ...formData.siteReports, titleEn: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder={isRTL ? 'العنوان (بالعربية)' : 'Title (Arabic)'}
            value={formData.siteReports.titleAr}
            onChange={(e) => setFormData({
              ...formData,
              siteReports: { ...formData.siteReports, titleAr: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Performance Review */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Activity className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'مراجعة الأداء' : 'Performance Review'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={isRTL ? 'المقياس (بالإنجليزية)' : 'Metric (English)'}
            value={formData.performanceReview.metricEn}
            onChange={(e) => setFormData({
              ...formData,
              performanceReview: { ...formData.performanceReview, metricEn: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder={isRTL ? 'المقياس (بالعربية)' : 'Metric (Arabic)'}
            value={formData.performanceReview.metricAr}
            onChange={(e) => setFormData({
              ...formData,
              performanceReview: { ...formData.performanceReview, metricAr: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Improvement Actions */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Zap className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إجراءات التحسين' : 'Improvement Actions'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={isRTL ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
            value={formData.improvements.titleEn}
            onChange={(e) => setFormData({
              ...formData,
              improvements: { ...formData.improvements, titleEn: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder={isRTL ? 'العنوان (بالعربية)' : 'Title (Arabic)'}
            value={formData.improvements.titleAr}
            onChange={(e) => setFormData({
              ...formData,
              improvements: { ...formData.improvements, titleAr: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};