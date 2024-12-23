import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useFinancialReports } from '../../../../hooks/useFinancialReports';
import { FileText, Download } from 'lucide-react';

export const ReportsList: React.FC = () => {
  const { language } = useLanguage();
  const { reports } = useFinancialReports();
  const isRTL = language === 'ar';

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'income':
        return 'bg-green-100 text-green-800';
      case 'expense':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {reports.map((report, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center">
            <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <div>
              <h4 className="font-medium text-gray-900">
                {isRTL ? report.titleAr : report.titleEn}
              </h4>
              <div className="flex items-center mt-1">
                <span className={`px-2 py-1 rounded-full text-xs ${getReportTypeColor(report.type)}`}>
                  {report.type}
                </span>
                <span className="text-sm text-gray-500 mx-2">•</span>
                <span className="text-sm text-gray-500">
                  {isRTL ? report.dateAr : report.dateEn}
                </span>
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};