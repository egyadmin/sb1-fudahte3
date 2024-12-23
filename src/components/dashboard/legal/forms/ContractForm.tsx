import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Save } from 'lucide-react';
import { ContractDocumentUpload } from '../contracts/ContractDocumentUpload';

interface ContractFormProps {
  onClose: () => void;
}

export const ContractForm: React.FC<ContractFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    type: 'service',
    value: '',
    startDate: '',
    endDate: '',
    partyNameEn: '',
    partyNameAr: '',
    termsEn: '',
    termsAr: '',
    documentUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Contract creation logic will be implemented here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة عقد جديد' : 'Add New Contract'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
          </label>
          <input
            type="text"
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان (بالعربية)' : 'Title (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.titleAr}
            onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'نوع العقد' : 'Contract Type'}
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          >
            <option value="service">{isRTL ? 'خدمات' : 'Service'}</option>
            <option value="procurement">{isRTL ? 'مشتريات' : 'Procurement'}</option>
            <option value="employment">{isRTL ? 'توظيف' : 'Employment'}</option>
            <option value="lease">{isRTL ? 'إيجار' : 'Lease'}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'القيمة' : 'Value'}
          </label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ البداية' : 'Start Date'}
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ النهاية' : 'End Date'}
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          />
        </div>

        <div className="col-span-2">
          <ContractDocumentUpload
            onUploadComplete={(url) => setFormData({ ...formData, documentUrl: url })}
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
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'حفظ' : 'Save'}
        </button>
      </div>
    </form>
  );
};