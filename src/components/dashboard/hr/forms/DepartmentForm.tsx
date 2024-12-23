import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useHR } from '../../../../hooks/useHR';
import { Building2, X } from 'lucide-react';

interface DepartmentFormProps {
  onClose: () => void;
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const { addDepartment } = useHR();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDepartment(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Building2 className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة قسم جديد' : 'Add New Department'}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.nameEn}
          onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
          placeholder="Department Name (English)"
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          value={formData.nameAr}
          onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
          placeholder="اسم القسم (بالعربية)"
          className="p-2 border rounded-lg text-right"
          required
        />
        <textarea
          value={formData.descriptionEn}
          onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
          placeholder="Description (English)"
          className="p-2 border rounded-lg col-span-2"
          rows={3}
        />
        <textarea
          value={formData.descriptionAr}
          onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
          placeholder="الوصف (بالعربية)"
          className="p-2 border rounded-lg col-span-2 text-right"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-700"
        >
          {isRTL ? 'إلغاء' : 'Cancel'}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {isRTL ? 'إضافة القسم' : 'Add Department'}
        </button>
      </div>
    </form>
  );
};