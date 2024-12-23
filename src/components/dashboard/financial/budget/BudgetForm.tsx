import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { DollarSign, Save, Plus, X } from 'lucide-react';
import { useToast } from '../../../../hooks/useToast';

interface BudgetFormProps {
  onClose: () => void;
}

export const BudgetForm: React.FC<BudgetFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const isRTL = language === 'ar';
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryEn: '',
    categoryAr: '',
    allocated: '',
    fiscalYear: new Date().getFullYear().toString(),
    subcategories: [
      { nameEn: '', nameAr: '', amount: '' }
    ]
  });

  const handleAddSubcategory = () => {
    setFormData(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, { nameEn: '', nameAr: '', amount: '' }]
    }));
  };

  const handleRemoveSubcategory = (index: number) => {
    if (formData.subcategories.length > 1) {
      setFormData(prev => ({
        ...prev,
        subcategories: prev.subcategories.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    // Validate main fields
    if (!formData.categoryEn.trim() || !formData.categoryAr.trim() || !formData.allocated) {
      showToast(
        isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        'error'
      );
      return false;
    }

    // Validate subcategories
    const isSubcategoriesValid = formData.subcategories.every(sub => 
      sub.nameEn.trim() && sub.nameAr.trim() && sub.amount
    );

    if (!isSubcategoriesValid) {
      showToast(
        isRTL ? 'يرجى ملء جميع الفئات الفرعية' : 'Please fill all subcategories',
        'error'
      );
      return false;
    }

    // Validate total subcategory amounts don't exceed allocated amount
    const totalSubcategoryAmount = formData.subcategories.reduce(
      (sum, sub) => sum + Number(sub.amount), 
      0
    );

    if (totalSubcategoryAmount > Number(formData.allocated)) {
      showToast(
        isRTL ? 'مجموع الفئات الفرعية يتجاوز المبلغ المخصص' : 'Sum of subcategories exceeds allocated amount',
        'error'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Here you would typically make an API call to save the budget data
      // For now we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));

      showToast(
        isRTL ? 'تم حفظ الميزانية بنجاح' : 'Budget saved successfully',
        'success'
      );
      onClose();
    } catch (error) {
      showToast(
        isRTL ? 'حدث خطأ أثناء حفظ الميزانية' : 'Error saving budget',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة فئة ميزانية جديدة' : 'Add New Budget Category'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الفئة (بالإنجليزية)' : 'Category (English)'}
          </label>
          <input
            type="text"
            value={formData.categoryEn}
            onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الفئة (بالعربية)' : 'Category (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.categoryAr}
            onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            required
            min="2024"
            max="2030"
          />
        </div>
      </div>

      {/* Subcategories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">
            {isRTL ? 'الفئات الفرعية' : 'Subcategories'}
          </h4>
          <button
            type="button"
            onClick={handleAddSubcategory}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
            {isRTL ? 'إضافة فئة فرعية' : 'Add Subcategory'}
          </button>
        </div>

        {formData.subcategories.map((sub, index) => (
          <div key={index} className="relative grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isRTL ? 'الاسم (بالإنجليزية)' : 'Name (English)'}
              </label>
              <input
                type="text"
                value={sub.nameEn}
                onChange={(e) => {
                  const newSubcategories = [...formData.subcategories];
                  newSubcategories[index].nameEn = e.target.value;
                  setFormData({ ...formData, subcategories: newSubcategories });
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isRTL ? 'الاسم (بالعربية)' : 'Name (Arabic)'}
              </label>
              <input
                type="text"
                value={sub.nameAr}
                onChange={(e) => {
                  const newSubcategories = [...formData.subcategories];
                  newSubcategories[index].nameAr = e.target.value;
                  setFormData({ ...formData, subcategories: newSubcategories });
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isRTL ? 'المبلغ' : 'Amount'}
              </label>
              <input
                type="number"
                value={sub.amount}
                onChange={(e) => {
                  const newSubcategories = [...formData.subcategories];
                  newSubcategories[index].amount = e.target.value;
                  setFormData({ ...formData, subcategories: newSubcategories });
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                required
                min="0"
                step="0.01"
              />
              {formData.subcategories.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSubcategory(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
          disabled={loading}
        >
          {isRTL ? 'إلغاء' : 'Cancel'}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'حفظ' : 'Save'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};