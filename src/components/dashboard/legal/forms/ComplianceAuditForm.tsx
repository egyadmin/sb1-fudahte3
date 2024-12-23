import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ClipboardCheck, Save } from 'lucide-react';
import { DocumentUpload } from '../documents/DocumentUpload';
import { AuditFindings } from './audit/AuditFindings';
import { AuditScore } from './audit/AuditScore';

interface ComplianceAuditFormProps {
  onClose: () => void;
}

export const ComplianceAuditForm: React.FC<ComplianceAuditFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    type: 'internal',
    scopeEn: '',
    scopeAr: '',
    findingsEn: '',
    findingsAr: '',
    auditDate: '',
    auditorEn: '',
    auditorAr: '',
    score: 0,
    recommendations: '',
    documentUrl: '',
    status: 'planned'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Compliance audit creation logic will be implemented here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ClipboardCheck className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة تدقيق امتثال جديد' : 'Add New Compliance Audit'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Information */}
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

        {/* Audit Type and Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'نوع التدقيق' : 'Audit Type'}
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          >
            <option value="internal">{isRTL ? 'داخلي' : 'Internal'}</option>
            <option value="external">{isRTL ? 'خارجي' : 'External'}</option>
            <option value="regulatory">{isRTL ? 'تنظيمي' : 'Regulatory'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الحالة' : 'Status'}
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          >
            <option value="planned">{isRTL ? 'مخطط' : 'Planned'}</option>
            <option value="in_progress">{isRTL ? 'قيد التنفيذ' : 'In Progress'}</option>
            <option value="completed">{isRTL ? 'مكتمل' : 'Completed'}</option>
            <option value="follow_up">{isRTL ? 'متابعة' : 'Follow Up'}</option>
          </select>
        </div>

        {/* Dates and Auditor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ التدقيق' : 'Audit Date'}
          </label>
          <input
            type="date"
            value={formData.auditDate}
            onChange={(e) => setFormData({ ...formData, auditDate: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المدقق (بالإنجليزية)' : 'Auditor (English)'}
          </label>
          <input
            type="text"
            value={formData.auditorEn}
            onChange={(e) => setFormData({ ...formData, auditorEn: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          />
        </div>

        {/* Scope */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'النطاق (بالإنجليزية)' : 'Scope (English)'}
          </label>
          <textarea
            value={formData.scopeEn}
            onChange={(e) => setFormData({ ...formData, scopeEn: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            rows={3}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'النطاق (بالعربية)' : 'Scope (Arabic)'}
          </label>
          <textarea
            value={formData.scopeAr}
            onChange={(e) => setFormData({ ...formData, scopeAr: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            rows={3}
            required
          />
        </div>

        {/* Findings */}
        <div className="col-span-2">
          <AuditFindings
            findingsEn={formData.findingsEn}
            findingsAr={formData.findingsAr}
            onChange={(findingsEn, findingsAr) => 
              setFormData({ ...formData, findingsEn, findingsAr })}
          />
        </div>

        {/* Score */}
        <div className="col-span-2">
          <AuditScore
            score={formData.score}
            onChange={(score) => setFormData({ ...formData, score })}
          />
        </div>

        {/* Document Upload */}
        <div className="col-span-2">
          <DocumentUpload
            documentType="compliance"
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