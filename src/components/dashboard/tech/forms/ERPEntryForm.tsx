import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Database, Save } from 'lucide-react';

interface ERPEntryFormProps {
  onClose: () => void;
}

export const ERPEntryForm: React.FC<ERPEntryFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    moduleEn: '',
    moduleAr: '',
    actionEn: '',
    actionAr: '',
    userEn: '',
    userAr: '',
    timestamp: new Date().toISOString()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ERP entry creation logic will be implemented here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Database className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة إدخال ERP جديد' : 'Add New ERP Entry'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الوحدة (بالإنجليزية)' : 'Module (English)'}
          </label>
          <input
            type="text"
            value={formData.moduleEn}
            onChange={(e) => setFormData({ ...formData, moduleEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الوحدة (بالعربية)' : 'Module (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.moduleAr}
            onChange={(e) => setFormData({ ...formData, moduleAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الإجراء (بالإنجليزية)' : 'Action (English)'}
          </label>
          <input
            type="text"
            value={formData.actionEn}
            onChange={(e) => setFormData({ ...formData, actionEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الإجراء (بالعربية)' : 'Action (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.actionAr}
            onChange={(e) => setFormData({ ...formData, actionAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المستخدم (بالإنجليزية)' : 'User (English)'}
          </label>
          <input
            type="text"
            value={formData.userEn}
            onChange={(e) => setFormData({ ...formData, userEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المستخدم (بالعربية)' : 'User (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.userAr}
            onChange={(e) => setFormData({ ...formData, userAr: e.target.value })}
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
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'حفظ' : 'Save'}
        </button>
      </div>
    </form>
  );
};