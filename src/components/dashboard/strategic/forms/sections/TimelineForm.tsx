import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { Calendar } from 'lucide-react';

export const TimelineForm: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    phaseEn: '',
    phaseAr: '',
    startDate: '',
    endDate: '',
    milestones: ''
  });

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center">
        <Calendar className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'الجداول الزمنية' : 'Timeline'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? 'المرحلة (بالإنجليزية)' : 'Phase (English)'}
          </label>
          <input
            type="text"
            value={formData.phaseEn}
            onChange={(e) => setFormData({ ...formData, phaseEn: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? 'المرحلة (بالعربية)' : 'Phase (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.phaseAr}
            onChange={(e) => setFormData({ ...formData, phaseAr: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? 'تاريخ البداية' : 'Start Date'}
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? 'تاريخ النهاية' : 'End Date'}
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};