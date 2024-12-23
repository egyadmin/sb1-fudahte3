import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { GraduationCap, Save, Upload } from 'lucide-react';
import { DocumentUpload } from '../documents/DocumentUpload';
import { TrainingSchedule } from './training/TrainingSchedule';
import { TrainingMaterials } from './training/TrainingMaterials';

interface ComplianceTrainingFormProps {
  onClose: () => void;
}

export const ComplianceTrainingForm: React.FC<ComplianceTrainingFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [showUpload, setShowUpload] = useState(false);

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    type: 'annual',
    startDate: '',
    endDate: '',
    materialsUrl: '',
    completionCriteria: '',
    targetAudience: 'all',
    capacity: '',
    location: '',
    instructorEn: '',
    instructorAr: '',
    documentUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Training creation logic will be implemented here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <GraduationCap className={`w-5 h-5 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة تدريب امتثال جديد' : 'Add New Compliance Training'}
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

        {/* Training Type and Target Audience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'نوع التدريب' : 'Training Type'}
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          >
            <option value="annual">{isRTL ? 'سنوي' : 'Annual'}</option>
            <option value="quarterly">{isRTL ? 'ربع سنوي' : 'Quarterly'}</option>
            <option value="onboarding">{isRTL ? 'تدريب الموظفين الجدد' : 'Onboarding'}</option>
            <option value="special">{isRTL ? 'خاص' : 'Special'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الجمهور المستهدف' : 'Target Audience'}
          </label>
          <select
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            required
          >
            <option value="all">{isRTL ? 'جميع الموظفين' : 'All Employees'}</option>
            <option value="new">{isRTL ? 'الموظفون الجدد' : 'New Employees'}</option>
            <option value="management">{isRTL ? 'الإدارة' : 'Management'}</option>
            <option value="department">{isRTL ? 'قسم محدد' : 'Specific Department'}</option>
          </select>
        </div>

        {/* Schedule */}
        <TrainingSchedule
          startDate={formData.startDate}
          endDate={formData.endDate}
          onStartDateChange={(date) => setFormData({ ...formData, startDate: date })}
          onEndDateChange={(date) => setFormData({ ...formData, endDate: date })}
        />

        {/* Instructor Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المدرب (بالإنجليزية)' : 'Instructor (English)'}
          </label>
          <input
            type="text"
            value={formData.instructorEn}
            onChange={(e) => setFormData({ ...formData, instructorEn: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المدرب (بالعربية)' : 'Instructor (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.instructorAr}
            onChange={(e) => setFormData({ ...formData, instructorAr: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الوصف (بالإنجليزية)' : 'Description (English)'}
          </label>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            rows={3}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الوصف (بالعربية)' : 'Description (Arabic)'}
          </label>
          <textarea
            value={formData.descriptionAr}
            onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            rows={3}
            required
          />
        </div>

        {/* Training Materials */}
        <div className="col-span-2">
          <TrainingMaterials
            onUploadComplete={(url) => setFormData({ ...formData, materialsUrl: url })}
          />
        </div>
      </div>

      {/* Action Buttons */}
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