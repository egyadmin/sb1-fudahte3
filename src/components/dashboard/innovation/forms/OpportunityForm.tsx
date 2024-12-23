import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Lightbulb, Save } from 'lucide-react';
import { useInnovation } from '../../../../hooks/useInnovation';

interface OpportunityFormProps {
  onClose: () => void;
}

export const OpportunityForm: React.FC<OpportunityFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const { addOpportunity, loading } = useInnovation();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    impact: 'high' as const,
    expectedBenefitsEn: '',
    expectedBenefitsAr: '',
    resourcesRequired: '',
    estimatedCost: '',
    targetDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addOpportunity(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Lightbulb className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة فرصة جديدة' : 'Add New Opportunity'}
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
            {isRTL ? 'التأثير' : 'Impact'}
          </label>
          <select
            value={formData.impact}
            onChange={(e) => setFormData({ ...formData, impact: e.target.value as 'high' | 'medium' | 'low' })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="high">{isRTL ? 'عالي' : 'High'}</option>
            <option value="medium">{isRTL ? 'متوسط' : 'Medium'}</option>
            <option value="low">{isRTL ? 'منخفض' : 'Low'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ الاستهداف' : 'Target Date'}
          </label>
          <input
            type="date"
            value={formData.targetDate}
            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
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
            {isRTL ? 'الفوائد المتوقعة (بالإنجليزية)' : 'Expected Benefits (English)'}
          </label>
          <textarea
            value={formData.expectedBenefitsEn}
            onChange={(e) => setFormData({ ...formData, expectedBenefitsEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={3}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الفوائد المتوقعة (بالعربية)' : 'Expected Benefits (Arabic)'}
          </label>
          <textarea
            value={formData.expectedBenefitsAr}
            onChange={(e) => setFormData({ ...formData, expectedBenefitsAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الموارد المطلوبة' : 'Required Resources'}
          </label>
          <input
            type="text"
            value={formData.resourcesRequired}
            onChange={(e) => setFormData({ ...formData, resourcesRequired: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'التكلفة المقدرة' : 'Estimated Cost'}
          </label>
          <input
            type="number"
            value={formData.estimatedCost}
            onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
            min="0"
            step="0.01"
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