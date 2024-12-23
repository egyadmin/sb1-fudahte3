import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';

interface ImprovementInputProps {
  onSubmit: (data: {
    titleEn: string;
    titleAr: string;
    status: 'planned' | 'in-progress' | 'completed';
    progress: number;
    impactEn: string;
    impactAr: string;
  }) => void;
}

export const ImprovementInput: React.FC<ImprovementInputProps> = ({ onSubmit }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    status: 'planned' as const,
    progress: 0,
    impactEn: '',
    impactAr: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      titleEn: '',
      titleAr: '',
      status: 'planned',
      progress: 0,
      impactEn: '',
      impactAr: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-4">
        <TrendingUp className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'إدخال التحسينات' : 'Improvement Input'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.titleEn}
          onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
          placeholder="Improvement Title (English)"
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          value={formData.titleAr}
          onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
          placeholder="عنوان التحسين (بالعربية)"
          className="p-2 border rounded-lg"
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          className="p-2 border rounded-lg"
          required
        >
          <option value="planned">{isRTL ? 'مخطط' : 'Planned'}</option>
          <option value="in-progress">{isRTL ? 'قيد التنفيذ' : 'In Progress'}</option>
          <option value="completed">{isRTL ? 'مكتمل' : 'Completed'}</option>
        </select>
        <input
          type="number"
          value={formData.progress}
          onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
          placeholder="Progress %"
          className="p-2 border rounded-lg"
          min="0"
          max="100"
          required
        />
        <textarea
          value={formData.impactEn}
          onChange={(e) => setFormData({ ...formData, impactEn: e.target.value })}
          placeholder="Impact Description (English)"
          className="p-2 border rounded-lg"
          required
        />
        <textarea
          value={formData.impactAr}
          onChange={(e) => setFormData({ ...formData, impactAr: e.target.value })}
          placeholder="وصف التأثير (بالعربية)"
          className="p-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {isRTL ? 'حفظ بيانات التحسين' : 'Save Improvement Data'}
      </button>
    </form>
  );
};