import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Plus, Download } from 'lucide-react';
import { ReportsList } from './ReportsList';
import { ReportsSummary } from './ReportsSummary';

interface FinancialReportsProps {
  onGenerateReport: () => void;
}

export const FinancialReports: React.FC<FinancialReportsProps> = ({ onGenerateReport }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'التقارير المالية' : 'Financial Reports'}
          </h3>
        </div>
        <button
          onClick={onGenerateReport}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إنشاء تقرير' : 'Generate Report'}
        </button>
      </div>

      <ReportsSummary />
      <ReportsList />
    </div>
  );
};