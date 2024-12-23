import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Shield, Save, Upload } from 'lucide-react';
import { DocumentUpload } from '../documents/DocumentUpload';

interface ComplianceFormData {
  titleEn: string;
  titleAr: string;
  type: string;
  referenceNumber: string;
  issueDate: string;
  expiryDate: string;
  statusEn: string;
  statusAr: string;
  notesEn: string;
  notesAr: string;
  documentUrl?: string;
}

export const ComplianceForm: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [showUpload, setShowUpload] = useState(false);

  const [formData, setFormData] = useState<ComplianceFormData>({
    titleEn: '',
    titleAr: '',
    type: 'certification',
    referenceNumber: '',
    issueDate: '',
    expiryDate: '',
    statusEn: 'active',
    statusAr: 'نشط',
    notesEn: '',
    notesAr: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
  };

  const handleUploadComplete = (url: string) => {
    setFormData(prev => ({ ...prev, documentUrl: url }));
    setShowUpload(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Shield className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'نموذج الامتثال القانوني' : 'Legal Compliance Form'}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Fields */}
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
        </div>

        {/* Type and Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'النوع' : 'Type'}
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              required
            >
              <option value="certification">{isRTL ? 'شهادة' : 'Certification'}</option>
              <option value="license">{isRTL ? 'رخصة' : 'License'}</option>
              <option value="permit">{isRTL ? 'تصريح' : 'Permit'}</option>
              <option value="registration">{isRTL ? 'تسجيل' : 'Registration'}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'رقم المرجع' : 'Reference Number'}
            </label>
            <input
              type="text"
              value={formData.referenceNumber}
              onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'تاريخ الإصدار' : 'Issue Date'}
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'تاريخ الانتهاء' : 'Expiry Date'}
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              required
            />
          </div>
        </div>

        {/* Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'ملاحظات (بالإنجليزية)' : 'Notes (English)'}
            </label>
            <textarea
              value={formData.notesEn}
              onChange={(e) => setFormData({ ...formData, notesEn: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? 'ملاحظات (بالعربية)' : 'Notes (Arabic)'}
            </label>
            <textarea
              value={formData.notesAr}
              onChange={(e) => setFormData({ ...formData, notesAr: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              rows={3}
            />
          </div>
        </div>

        {/* Document Upload */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowUpload(true)}
            className="flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <Upload className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'تحميل المستند' : 'Upload Document'}
          </button>

          {showUpload && (
            <DocumentUpload
              documentType="compliance"
              onUploadComplete={handleUploadComplete}
            />
          )}

          {formData.documentUrl && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                {isRTL ? 'تم تحميل المستند' : 'Document uploaded'}
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'حفظ' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};