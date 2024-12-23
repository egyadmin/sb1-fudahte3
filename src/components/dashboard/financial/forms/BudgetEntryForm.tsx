import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { DollarSign, Save } from 'lucide-react';
import { useFinancialManagement } from '../../../../hooks/useFinancialManagement';

export const BudgetEntryForm = ({ onClose }: { onClose: () => void }) => {
  const { language } = useLanguage();
  const { handleAddBudgetCategory, loading } = useFinancialManagement();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    allocated: '',
    fiscalYear: new Date().getFullYear().toString(),
    descriptionEn: '',
    descriptionAr: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAddBudgetCategory({
      nameEn: formData.nameEn,
      nameAr: formData.nameAr,
      allocated: Number(formData.allocated),
      fiscalYear: formData.fiscalYear
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إدخال بيانات الميزانية' : 'Budget Entry'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الاسم (بالإنجليزية)' : 'Name (English)'}
          </label>
          <input
            type="text"
            value={formData.nameEn}
            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الاسم (بالعربية)' : 'Name (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.nameAr}
            onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المبلغ المخصص' : 'Allocated Amount'}
          </label>
          <input
            type="number"
            value={formData.allocated}
            onChange={(e) => setFormData({ ...formData, allocated: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'السنة المالية' : 'Fiscal Year'}
          </label>
          <input
            type="number"
            value={formData.fiscalYear}
            onChange={(e) => setFormData({ ...formData, fiscalYear: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
            min="2000"
            max="2100"
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