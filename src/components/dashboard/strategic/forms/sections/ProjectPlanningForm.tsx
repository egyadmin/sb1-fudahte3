import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { Target } from 'lucide-react';

export const ProjectPlanningForm: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    objectiveEn: '',
    objectiveAr: '',
    descriptionEn: '',
    descriptionAr: '',
    targetDate: '',
    status: 'planned'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Target className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'أهداف المشروع' : 'Project Objectives'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isRTL ? 'الهدف (بالإنجليزية)' : 'Objective (English)'}
            </label>
            <input
              type="text"
              value={formData.objectiveEn}
              onChange={(e) => setFormData({ ...formData, objectiveEn: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isRTL ? 'الهدف (بالعربية)' : 'Objective (Arabic)'}
            </label>
            <input
              type="text"
              value={formData.objectiveAr}
              onChange={(e) => setFormData({ ...formData, objectiveAr: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              {isRTL ? 'الوصف (بالإنجليزية)' : 'Description (English)'}
            </label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              {isRTL ? 'الوصف (بالعربية)' : 'Description (Arabic)'}
            </label>
            <textarea
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};