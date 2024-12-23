import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useHR } from '../../../../hooks/useHR';
import { FileText } from 'lucide-react';

export const PolicyForm: React.FC = () => {
  const { language } = useLanguage();
  const { addPolicy } = useHR();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    contentEn: '',
    contentAr: '',
    category: 'general',
    effectiveDate: '',
    version: '1.0'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPolicy(formData);
    setFormData({
      titleEn: '',
      titleAr: '',
      contentEn: '',
      contentAr: '',
      category: 'general',
      effectiveDate: '',
      version: '1.0'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center">
        <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'إضافة سياسة جديدة' : 'Add New Policy'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.titleEn}
          onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
          placeholder={isRTL ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          value={formData.titleAr}
          onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
          placeholder={isRTL ? 'العنوان (بالعربية)' : 'Title (Arabic)'}
          className="p-2 border rounded-lg"
          required
        />
        <textarea
          value={formData.contentEn}
          onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
          placeholder={isRTL ? 'المحتوى (بالإنجليزية)' : 'Content (English)'}
          className="p-2 border rounded-lg"
          rows={4}
          required
        />
        <textarea
          value={formData.contentAr}
          onChange={(e) => setFormData({ ...formData, contentAr: e.target.value })}
          placeholder={isRTL ? 'المحتوى (بالعربية)' : 'Content (Arabic)'}
          className="p-2 border rounded-lg"
          rows={4}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="p-2 border rounded-lg"
          required
        >
          <option value="general">{isRTL ? 'عام' : 'General'}</option>
          <option value="leave">{isRTL ? 'إجازة' : 'Leave'}</option>
          <option value="conduct">{isRTL ? 'السلوك' : 'Conduct'}</option>
          <option value="benefits">{isRTL ? 'المزايا' : 'Benefits'}</option>
        </select>
        <input
          type="date"
          value={formData.effectiveDate}
          onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
          className="p-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {isRTL ? 'إضافة سياسة' : 'Add Policy'}
      </button>
    </form>
  );
};