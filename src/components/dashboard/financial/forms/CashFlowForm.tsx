import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { DollarSign, Save } from 'lucide-react';
import { useFinancialManagement } from '../../../../hooks/useFinancialManagement';

export const CashFlowForm = ({ onClose }: { onClose: () => void }) => {
  const { language } = useLanguage();
  const { handleAddTransaction, loading } = useFinancialManagement();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    typeEn: '',
    typeAr: '',
    amount: '',
    categoryId: '',
    descriptionEn: '',
    descriptionAr: '',
    transactionDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAddTransaction({
      typeEn: formData.typeEn,
      typeAr: formData.typeAr,
      amount: Number(formData.amount),
      categoryId: formData.categoryId,
      descriptionEn: formData.descriptionEn,
      descriptionAr: formData.descriptionAr,
      transactionDate: formData.transactionDate
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إدخال التدفقات النقدية' : 'Cash Flow Entry'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'النوع (بالإنجليزية)' : 'Type (English)'}
          </label>
          <select
            value={formData.typeEn}
            onChange={(e) => setFormData({ ...formData, typeEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'النوع (بالعربية)' : 'Type (Arabic)'}
          </label>
          <select
            value={formData.typeAr}
            onChange={(e) => setFormData({ ...formData, typeAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">اختر النوع</option>
            <option value="income">إيرادات</option>
            <option value="expense">مصروفات</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المبلغ' : 'Amount'}
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ المعاملة' : 'Transaction Date'}
          </label>
          <input
            type="date"
            value={formData.transactionDate}
            onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
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