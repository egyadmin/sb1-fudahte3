import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Activity } from 'lucide-react';

interface MetricsInputProps {
  onSubmit: (data: {
    titleEn: string;
    titleAr: string;
    completion: number;
    trend: number;
  }) => void;
}

export const MetricsInput: React.FC<MetricsInputProps> = ({ onSubmit }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    completion: 0,
    trend: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ titleEn: '', titleAr: '', completion: 0, trend: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-4">
        <Activity className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'إدخال المؤشرات' : 'Metrics Input'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.titleEn}
          onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
          placeholder="Title (English)"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={formData.titleAr}
          onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
          placeholder="العنوان (بالعربية)"
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          value={formData.completion}
          onChange={(e) => setFormData({ ...formData, completion: Number(e.target.value) })}
          placeholder="Completion %"
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          value={formData.trend}
          onChange={(e) => setFormData({ ...formData, trend: Number(e.target.value) })}
          placeholder="Trend %"
          className="p-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {isRTL ? 'حفظ المؤشرات' : 'Save Metrics'}
      </button>
    </form>
  );
};