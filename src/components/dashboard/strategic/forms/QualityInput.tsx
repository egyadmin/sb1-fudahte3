import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';

interface QualityInputProps {
  onSubmit: (data: {
    titleEn: string;
    titleAr: string;
    status: 'improved' | 'stable' | 'declined';
    descriptionEn: string;
    descriptionAr: string;
  }) => void;
}

export const QualityInput: React.FC<QualityInputProps> = ({ onSubmit }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    status: 'stable' as 'improved' | 'stable' | 'declined',
    descriptionEn: '',
    descriptionAr: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      titleEn: '',
      titleAr: '',
      status: 'stable',
      descriptionEn: '',
      descriptionAr: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-4">
        <CheckCircle className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'إدخال بيانات الجودة' : 'Quality Input'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.titleEn}
          onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
          placeholder="Quality Metric (English)"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={formData.titleAr}
          onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
          placeholder="مقياس الجودة (بالعربية)"
          className="p-2 border rounded-lg"
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          className="p-2 border rounded-lg"
        >
          <option value="improved">{isRTL ? 'تحسن' : 'Improved'}</option>
          <option value="stable">{isRTL ? 'مستقر' : 'Stable'}</option>
          <option value="declined">{isRTL ? 'تراجع' : 'Declined'}</option>
        </select>
        <textarea
          value={formData.descriptionEn}
          onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
          placeholder="Description (English)"
          className="p-2 border rounded-lg"
        />
        <textarea
          value={formData.descriptionAr}
          onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
          placeholder="الوصف (بالعربية)"
          className="p-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {isRTL ? 'حفظ بيانات الجودة' : 'Save Quality Data'}
      </button>
    </form>
  );
};