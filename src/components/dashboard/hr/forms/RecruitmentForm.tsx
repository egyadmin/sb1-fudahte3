import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useHR } from '../../../../hooks/useHR';
import { UserPlus, X } from 'lucide-react';

interface RecruitmentFormProps {
  onClose: () => void;
}

export const RecruitmentForm: React.FC<RecruitmentFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const { addRecruitment, positions } = useHR();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    positionId: '',
    startDate: '',
    endDate: '',
    requirementsEn: '',
    requirementsAr: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRecruitment(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <UserPlus className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'نشر وظيفة جديدة' : 'Post New Job'}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={formData.positionId}
          onChange={(e) => setFormData({ ...formData, positionId: e.target.value })}
          className="p-2 border rounded-lg col-span-2"
          required
        >
          <option value="">{isRTL ? 'اختر المنصب' : 'Select Position'}</option>
          {positions.map((pos: any) => (
            <option key={pos.id} value={pos.id}>
              {isRTL ? pos.titleAr : pos.titleEn}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <textarea
          value={formData.requirementsEn}
          onChange={(e) => setFormData({ ...formData, requirementsEn: e.target.value })}
          placeholder="Additional Requirements (English)"
          className="p-2 border rounded-lg col-span-2"
          rows={3}
        />
        <textarea
          value={formData.requirementsAr}
          onChange={(e) => setFormData({ ...formData, requirementsAr: e.target.value })}
          placeholder="متطلبات إضافية (بالعربية)"
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
          {isRTL ? 'نشر الوظيفة' : 'Post Job'}
        </button>
      </div>
    </form>
  );
};