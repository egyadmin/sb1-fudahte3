import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Plus } from 'lucide-react';

export const ReportGenerator = () => {
  const { language } = useLanguage();
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
    // Report generation logic will be implemented here
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'إنشاء تقرير جديد' : 'Generate New Report'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              {isRTL ? 'النوع (بالإنجليزية)' : 'Type (English)'}
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
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'النوع (بالعربية)' : 'Type (Arabic)'}
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

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
        </button>
      </form>
    </div>
  );
};