import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { AlertTriangle, Save } from 'lucide-react';

interface EmergencyProtocolFormProps {
  onClose: () => void;
}

export const EmergencyProtocolForm: React.FC<EmergencyProtocolFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    procedureEn: '',
    procedureAr: '',
    emergencyType: 'fire',
    priority: 'high'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Emergency protocol creation logic will be implemented here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <AlertTriangle className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة بروتوكول طوارئ جديد' : 'Add New Emergency Protocol'}
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
            {isRTL ? 'نوع الطوارئ' : 'Emergency Type'}
          </label>
          <select
            value={formData.emergencyType}
            onChange={(e) => setFormData({ ...formData, emergencyType: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="fire">{isRTL ? 'حريق' : 'Fire'}</option>
            <option value="medical">{isRTL ? 'طبي' : 'Medical'}</option>
            <option value="security">{isRTL ? 'أمني' : 'Security'}</option>
            <option value="environmental">{isRTL ? 'بيئي' : 'Environmental'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الأولوية' : 'Priority'}
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="critical">{isRTL ? 'حرجة' : 'Critical'}</option>
            <option value="high">{isRTL ? 'عالية' : 'High'}</option>
            <option value="medium">{isRTL ? 'متوسطة' : 'Medium'}</option>
            <option value="low">{isRTL ? 'منخفضة' : 'Low'}</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الإجراءات (بالإنجليزية)' : 'Procedures (English)'}
          </label>
          <textarea
            value={formData.procedureEn}
            onChange={(e) => setFormData({ ...formData, procedureEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={4}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الإجراءات (بالعربية)' : 'Procedures (Arabic)'}
          </label>
          <textarea
            value={formData.procedureAr}
            onChange={(e) => setFormData({ ...formData, procedureAr: e.target.value })}
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