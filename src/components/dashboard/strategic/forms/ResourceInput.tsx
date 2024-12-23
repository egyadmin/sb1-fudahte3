import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { BarChart2 } from 'lucide-react';

interface ResourceInputProps {
  onSubmit: (data: {
    titleEn: string;
    titleAr: string;
    efficiency: number;
    descriptionEn: string;
    descriptionAr: string;
  }) => void;
}

export const ResourceInput: React.FC<ResourceInputProps> = ({ onSubmit }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    efficiency: 0,
    descriptionEn: '',
    descriptionAr: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      titleEn: '',
      titleAr: '',
      efficiency: 0,
      descriptionEn: '',
      descriptionAr: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-4">
        <BarChart2 className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'إدخال بيانات الموارد' : 'Resource Input'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.titleEn}
          onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
          placeholder="Resource Name (English)"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={formData.titleAr}
          onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
          placeholder="اسم المورد (بالعربية)"
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          value={formData.efficiency}
          onChange={(e) => setFormData({ ...formData, efficiency: Number(e.target.value) })}
          placeholder="Efficiency %"
          className="p-2 border rounded-lg"
        />
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
        {isRTL ? 'حفظ بيانات الموارد' : 'Save Resource Data'}
      </button>
    </form>
  );
};