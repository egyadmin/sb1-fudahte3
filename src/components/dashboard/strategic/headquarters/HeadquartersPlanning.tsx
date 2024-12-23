import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Building2 } from 'lucide-react';
import { ProjectObjectives } from './ProjectObjectives';
import { ProjectPlanning } from './ProjectPlanning';
import { ResourceAllocation } from './ResourceAllocation';
import { TimelineScheduling } from './TimelineScheduling';
import { PrintButton } from '../print/PrintButton';
import { PrintStyles } from '../print/PrintStyles';
import { PrintLayout } from '../print/PrintLayout';

export const HeadquartersPlanning: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <PrintStyles />
      
      {/* Screen Header */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div className="flex items-center">
          <Building2 className={`w-6 h-6 text-indigo-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
          <h2 className="text-xl font-bold text-gray-900">
            {isRTL ? 'التخطيط الاستراتيجي بالمركز الرئيسي' : 'Headquarters Strategic Planning'}
          </h2>
        </div>
        <PrintButton />
      </div>

      {/* Print Layout */}
      <PrintLayout>
        <div className="grid grid-cols-1 gap-8">
          <div className="print-section">
            <h2 className="text-xl font-bold mb-4">
              {isRTL ? 'الأهداف والتخطيط' : 'Objectives & Planning'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectObjectives />
              <ProjectPlanning />
            </div>
          </div>

          <div className="print-section print-break-before">
            <h2 className="text-xl font-bold mb-4">
              {isRTL ? 'الموارد والجدول الزمني' : 'Resources & Timeline'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResourceAllocation />
              <TimelineScheduling />
            </div>
          </div>

          <div className="print-section print-break-before">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">
                {isRTL ? 'ملاحظات وتوصيات' : 'Notes & Recommendations'}
              </h3>
              <div className="h-32 border-b border-dashed border-gray-300 mb-4"></div>
              <div className="flex justify-end mt-4">
                <div className="text-center">
                  <div className="w-40 border-b border-gray-300 mb-2"></div>
                  <p className="text-sm text-gray-600">
                    {isRTL ? 'توقيع المدير التنفيذي' : 'Executive Director Signature'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PrintLayout>

      {/* Screen Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:hidden">
        <ProjectObjectives />
        <ProjectPlanning />
        <ResourceAllocation />
        <TimelineScheduling />
      </div>
    </div>
  );
};