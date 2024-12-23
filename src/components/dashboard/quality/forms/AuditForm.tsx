import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ClipboardCheck, Save } from 'lucide-react';

interface AuditFormProps {
  onClose: () => void;
}

export const AuditForm: React.FC<AuditFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    findingsEn: '',
    findingsAr: '',
    auditDate: new Date().toISOString().split('T')[0],
    score: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Audit creation logic will be implemented here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ClipboardCheck className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة تدقيق جديد' : 'Add New Audit'}
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
            className="w-full p-2 border rounded-lg"
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
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ التدقيق' : 'Audit Date'}
          </label>
          <input
            type="date"
            value={formData.auditDate}
            onChange={(e) => setFormData({ ...formData, auditDate: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'النتيجة' : 'Score'}
          </label>
          <input
            type="number"
            value={formData.score}
            onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
            className="w-full p-2 border rounded-lg"
            required
            min="0"
            max="100"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'النتائج (بالإنجليزية)' : 'Findings (English)'}
          </label>
          <textarea
            value={formData.findingsEn}
            onChange={(e) => setFormData({ ...formData, findingsEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={4}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'النتائج (بالعربية)' : 'Findings (Arabic)'}
          </label>
          <textarea
            value={formData.findingsAr}
            onChange={(e) => setFormData({ ...formData, findingsAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={4}
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