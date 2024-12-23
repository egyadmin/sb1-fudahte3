import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useHR } from '../../../../hooks/useHR';
import { Briefcase, X } from 'lucide-react';

interface PositionFormProps {
  onClose: () => void;
}

export const PositionForm: React.FC<PositionFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const { addPosition, departments } = useHR();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    departmentId: '',
    requirementsEn: '',
    requirementsAr: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPosition(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Briefcase className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة منصب جديد' : 'Add New Position'}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.titleEn}
          onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
          placeholder="Position Title (English)"
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          value={formData.titleAr}
          onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
          placeholder="المسمى الوظيفي (بالعربية)"
          className="p-2 border rounded-lg text-right"
          required
        />
        <select
          value={formData.departmentId}
          onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
          className="p-2 border rounded-lg col-span-2"
          required
        >
          <option value="">{isRTL ? 'اختر القسم' : 'Select Department'}</option>
          {departments.map((dept: any) => (
            <option key={dept.id} value={dept.id}>
              {isRTL ? dept.nameAr : dept.nameEn}
            </option>
          ))}
        </select>
        <textarea
          value={formData.requirementsEn}
          onChange={(e) => setFormData({ ...formData, requirementsEn: e.target.value })}
          placeholder="Requirements (English)"
          className="p-2 border rounded-lg col-span-2"
          rows={3}
        />
        <textarea
          value={formData.requirementsAr}
          onChange={(e) => setFormData({ ...formData, requirementsAr: e.target.value })}
          placeholder="المتطلبات (بالعربية)"
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
          {isRTL ? 'إضافة المنصب' : 'Add Position'}
        </button>
      </div>
    </form>
  );
};