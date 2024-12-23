import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { Building2, Truck, CheckCircle, FileText } from 'lucide-react';
import { FileUploadSection } from './FileUploadSection';

export const OperationsForm: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    resourceDeployment: {
      titleEn: '',
      titleAr: '',
      quantity: '',
      status: 'pending',
      documentUrl: ''
    },
    qualityMonitoring: {
      metricEn: '',
      metricAr: '',
      target: '',
      actual: '',
      reportUrl: ''
    },
    progressReport: {
      titleEn: '',
      titleAr: '',
      completionRate: '',
      notes: '',
      reportUrl: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Resource Deployment */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Truck className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إرسال الموارد' : 'Resource Deployment'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={isRTL ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
            value={formData.resourceDeployment.titleEn}
            onChange={(e) => setFormData({
              ...formData,
              resourceDeployment: {
                ...formData.resourceDeployment,
                titleEn: e.target.value
              }
            })}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder={isRTL ? 'العنوان (بالعربية)' : 'Title (Arabic)'}
            value={formData.resourceDeployment.titleAr}
            onChange={(e) => setFormData({
              ...formData,
              resourceDeployment: {
                ...formData.resourceDeployment,
                titleAr: e.target.value
              }
            })}
            className="p-2 border rounded-lg"
          />
        </div>
        <FileUploadSection
          section="resources"
          onUploadComplete={(url) => setFormData({
            ...formData,
            resourceDeployment: {
              ...formData.resourceDeployment,
              documentUrl: url
            }
          })}
        />
      </div>

      {/* Quality Monitoring */}
      <div className="space-y-4">
        <div className="flex items-center">
          <CheckCircle className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'متابعة جودة العمل' : 'Quality Monitoring'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={isRTL ? 'المقياس (بالإنجليزية)' : 'Metric (English)'}
            value={formData.qualityMonitoring.metricEn}
            onChange={(e) => setFormData({
              ...formData,
              qualityMonitoring: {
                ...formData.qualityMonitoring,
                metricEn: e.target.value
              }
            })}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder={isRTL ? 'المقياس (بالعربية)' : 'Metric (Arabic)'}
            value={formData.qualityMonitoring.metricAr}
            onChange={(e) => setFormData({
              ...formData,
              qualityMonitoring: {
                ...formData.qualityMonitoring,
                metricAr: e.target.value
              }
            })}
            className="p-2 border rounded-lg"
          />
        </div>
        <FileUploadSection
          section="quality"
          onUploadComplete={(url) => setFormData({
            ...formData,
            qualityMonitoring: {
              ...formData.qualityMonitoring,
              reportUrl: url
            }
          })}
        />
      </div>

      {/* Progress Reports */}
      <div className="space-y-4">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'مراجعة التقارير الدورية' : 'Progress Reports'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={isRTL ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
            value={formData.progressReport.titleEn}
            onChange={(e) => setFormData({
              ...formData,
              progressReport: {
                ...formData.progressReport,
                titleEn: e.target.value
              }
            })}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder={isRTL ? 'العنوان (بالعربية)' : 'Title (Arabic)'}
            value={formData.progressReport.titleAr}
            onChange={(e) => setFormData({
              ...formData,
              progressReport: {
                ...formData.progressReport,
                titleAr: e.target.value
              }
            })}
            className="p-2 border rounded-lg"
          />
        </div>
        <FileUploadSection
          section="progress"
          onUploadComplete={(url) => setFormData({
            ...formData,
            progressReport: {
              ...formData.progressReport,
              reportUrl: url
            }
          })}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {isRTL ? 'حفظ البيانات' : 'Save Data'}
      </button>
    </form>
  );
};