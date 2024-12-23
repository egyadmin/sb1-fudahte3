import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp, Save } from 'lucide-react';
import { useInnovation } from '../../../../hooks/useInnovation';

interface MarketTrendFormProps {
  onClose: () => void;
}

export const MarketTrendForm: React.FC<MarketTrendFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const { addMarketTrend, loading } = useInnovation();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    impactEn: '',
    impactAr: '',
    growthRate: 0,
    category: 'technology'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMarketTrend(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة اتجاه سوق جديد' : 'Add New Market Trend'}
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
            {isRTL ? 'معدل النمو (%)' : 'Growth Rate (%)'}
          </label>
          <input
            type="number"
            value={formData.growthRate}
            onChange={(e) => setFormData({ ...formData, growthRate: Number(e.target.value) })}
            className="w-full p-2 border rounded-lg"
            required
            step="0.1"
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
            <option value="technology">{isRTL ? 'التكنولوجيا' : 'Technology'}</option>
            <option value="market">{isRTL ? 'السوق' : 'Market'}</option>
            <option value="consumer">{isRTL ? 'المستهلك' : 'Consumer'}</option>
            <option value="industry">{isRTL ? 'الصناعة' : 'Industry'}</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الوصف (بالإنجليزية)' : 'Description (English)'}
          </label>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={3}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الوصف (بالعربية)' : 'Description (Arabic)'}
          </label>
          <textarea
            value={formData.descriptionAr}
            onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={3}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'التأثير (بالإنجليزية)' : 'Impact (English)'}
          </label>
          <textarea
            value={formData.impactEn}
            onChange={(e) => setFormData({ ...formData, impactEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={2}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'التأثير (بالعربية)' : 'Impact (Arabic)'}
          </label>
          <textarea
            value={formData.impactAr}
            onChange={(e) => setFormData({ ...formData, impactAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={2}
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
          {isRTL ? 'حفظ' : 'Save'}
        </button>
      </div>
    </form>
  );
};