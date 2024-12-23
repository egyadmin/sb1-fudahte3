import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { FileText, Save } from 'lucide-react';
import { useReportsManagement } from '../../../hooks/useReportsManagement';

interface ReportGeneratorFormProps {
  onClose: () => void;
}

export const ReportGeneratorForm: React.FC<ReportGeneratorFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const { generateReport, loading } = useReportsManagement();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    typeEn: '',
    typeAr: '',
    department: 'general',
    startDate: '',
    endDate: '',
    contentEn: '',
    contentAr: ''
  });

  const reportTypes = [
    { valueEn: 'performance', valueAr: 'الأداء', labelEn: 'Performance Report', labelAr: 'تقرير الأداء' },
    { valueEn: 'financial', valueAr: 'مالي', labelEn: 'Financial Report', labelAr: 'تقرير مالي' },
    { valueEn: 'hr', valueAr: 'موارد_بشرية', labelEn: 'HR Report', labelAr: 'تقرير الموارد البشرية' },
    { valueEn: 'quality', valueAr: 'جودة', labelEn: 'Quality Report', labelAr: 'تقرير الجودة' },
    { valueEn: 'operations', valueAr: 'عمليات', labelEn: 'Operations Report', labelAr: 'تقرير العمليات' },
    { valueEn: 'innovation', valueAr: 'ابتكار', labelEn: 'Innovation Report', labelAr: 'تقرير الابتكار' }
  ];

  const departments = [
    { value: 'general', labelEn: 'General', labelAr: 'عام' },
    { value: 'hr', labelEn: 'Human Resources', labelAr: 'الموارد البشرية' },
    { value: 'finance', labelEn: 'Finance', labelAr: 'المالية' },
    { value: 'operations', labelEn: 'Operations', labelAr: 'العمليات' },
    { value: 'quality', labelEn: 'Quality', labelAr: 'الجودة' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateReport(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إنشاء تقرير جديد' : 'Generate New Report'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
          </label>
          <input
            type="text"
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان (بالعربية)' : 'Title (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.titleAr}
            onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'نوع التقرير' : 'Report Type'}
          </label>
          <select
            value={formData.typeEn}
            onChange={(e) => {
              const selectedType = reportTypes.find(type => type.valueEn === e.target.value);
              if (selectedType) {
                setFormData({
                  ...formData,
                  typeEn: selectedType.valueEn,
                  typeAr: selectedType.valueAr
                });
              }
            }}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">{isRTL ? 'اختر النوع' : 'Select Type'}</option>
            {reportTypes.map((type) => (
              <option key={type.valueEn} value={type.valueEn}>
                {isRTL ? type.labelAr : type.labelEn}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'القسم' : 'Department'}
          </label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {isRTL ? dept.labelAr : dept.labelEn}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ البداية' : 'Start Date'}
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ النهاية' : 'End Date'}
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المحتوى (بالإنجليزية)' : 'Content (English)'}
          </label>
          <textarea
            value={formData.contentEn}
            onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={6}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المحتوى (بالعربية)' : 'Content (Arabic)'}
          </label>
          <textarea
            value={formData.contentAr}
            onChange={(e) => setFormData({ ...formData, contentAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={6}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          {isRTL ? 'إلغاء' : 'Cancel'}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
        </button>
      </div>
    </form>
  );
};