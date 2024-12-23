import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { DollarSign, Plus } from 'lucide-react';

export const TransactionForm = () => {
  const { language } = useLanguage();
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
    // Transaction creation logic will be implemented here
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <DollarSign className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'إضافة معاملة جديدة' : 'Add New Transaction'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'النوع (بالإنجليزية)' : 'Type (English)'}
            </label>
            <input
              type="text"
              value={formData.typeEn}
              onChange={(e) => setFormData({ ...formData, typeEn: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'النوع (بالعربية)' : 'Type (Arabic)'}
            </label>
            <input
              type="text"
              value={formData.typeAr}
              onChange={(e) => setFormData({ ...formData, typeAr: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
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
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'الوصف (بالإنجليزية)' : 'Description (English)'}
            </label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'الوصف (بالعربية)' : 'Description (Arabic)'}
            </label>
            <textarea
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة معاملة' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};