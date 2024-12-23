import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { MessageSquarePlus, Save } from 'lucide-react';
import { useInnovation } from '../../../../hooks/useInnovation';

interface SuggestionFormProps {
  onClose: () => void;
}

export const SuggestionForm: React.FC<SuggestionFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const { addSuggestion, loading } = useInnovation();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    category: 'process',
    priority: 'medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSuggestion(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageSquarePlus className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة اقتراح جديد' : 'Add New Suggestion'}
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
            {isRTL ? 'الفئة' : 'Category'}
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="process">{isRTL ? 'تحسين العمليات' : 'Process Improvement'}</option>
            <option value="product">{isRTL ? 'تطوير المنتج' : 'Product Development'}</option>
            <option value="service">{isRTL ? 'تحسين الخدمة' : 'Service Enhancement'}</option>
            <option value="technology">{isRTL ? 'التكنولوجيا' : 'Technology'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الأولوية' : 'Priority'}
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="high">{isRTL ? 'عالية' : 'High'}</option>
            <option value="medium">{isRTL ? 'متوسطة' : 'Medium'}</option>
            <option value="low">{isRTL ? 'منخفضة' : 'Low'}</option>
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
            rows={4}
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
            rows={4}
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