import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Save } from 'lucide-react';
import { useFinancialManagement } from '../../../../hooks/useFinancialManagement';

export const ReportGeneratorForm = ({ onClose }: { onClose: () => void }) => {
  const { language } = useLanguage();
  const { handleGenerateReport, loading } = useFinancialManagement();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    typeEn: '',
    typeAr: '',
    startDate: '',
    endDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleGenerateReport(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إنشاء تقرير مالي' : 'Generate Financial Report'}
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
            {isRTL ? 'نوع التقرير (بالإنجليزية)' : 'Report Type (English)'}
          </label>
          <select
            value={formData.typeEn}
            onChange={(e) => setFormData({ ...formData, typeEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Type</option>
            <option value="income">Income Statement</option>
            <option value="expense">Expense Report</option>
            <option value="balance">Balance Sheet</option>
            <option value="cashflow">Cash Flow Statement</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'نوع التقرير (بالعربية)' : 'Report Type (Arabic)'}
          </label>
          <select
            value={formData.typeAr}
            onChange={(e) => setFormData({ ...formData, typeAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">اختر النوع</option>
            <option value="income">بيان الدخل</option>
            <option value="expense">تقرير المصروفات</option>
            <option value="balance">الميزانية العمومية</option>
            <option value="cashflow">بيان التدفقات النقدية</option>
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