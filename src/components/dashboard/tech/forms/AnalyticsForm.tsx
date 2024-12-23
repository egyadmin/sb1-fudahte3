import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { BarChart2, Save } from 'lucide-react';

interface AnalyticsFormProps {
  onClose: () => void;
}

export const AnalyticsForm: React.FC<AnalyticsFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    metricEn: '',
    metricAr: '',
    value: '',
    trend: '',
    category: 'performance'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Analytics metric creation logic will be implemented here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart2 className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة مقياس تحليلي' : 'Add Analytics Metric'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المقياس (بالإنجليزية)' : 'Metric (English)'}
          </label>
          <input
            type="text"
            value={formData.metricEn}
            onChange={(e) => setFormData({ ...formData, metricEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المقياس (بالعربية)' : 'Metric (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.metricAr}
            onChange={(e) => setFormData({ ...formData, metricAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'القيمة' : 'Value'}
          </label>
          <input
            type="text"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الاتجاه' : 'Trend'}
          </label>
          <input
            type="text"
            value={formData.trend}
            onChange={(e) => setFormData({ ...formData, trend: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
            placeholder="+12% or -5%"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الفئة' : 'Category'}
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="performance">{isRTL ? 'الأداء' : 'Performance'}</option>
            <option value="usage">{isRTL ? 'الاستخدام' : 'Usage'}</option>
            <option value="efficiency">{isRTL ? 'الكفاءة' : 'Efficiency'}</option>
          </select>
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
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'حفظ' : 'Save'}
        </button>
      </div>
    </form>
  );
};