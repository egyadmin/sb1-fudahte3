import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { FileText, Plus } from 'lucide-react';
import { ReportsList } from './ReportsList';
import { ReportGeneratorForm } from './ReportGeneratorForm';

export const DashboardReports = () => {
  const { language } = useLanguage();
  const [showGenerator, setShowGenerator] = useState(false);
  const isRTL = language === 'ar';

  return (
    <div className="space-y-6">
      {showGenerator ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ReportGeneratorForm onClose={() => setShowGenerator(false)} />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <h2 className="text-xl font-semibold">
                {isRTL ? 'التقارير' : 'Reports'}
              </h2>
            </div>
            <button
              onClick={() => setShowGenerator(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'إنشاء تقرير' : 'Generate Report'}
            </button>
          </div>
          <ReportsList />
        </div>
      )}
    </div>
  );
};