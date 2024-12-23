import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useReports } from '../../../hooks/useReports';
import { FileText, Download, Eye } from 'lucide-react';
import { ReportViewer } from './ReportViewer';

export const ReportsList = () => {
  const { language } = useLanguage();
  const { reports } = useReports();
  const [selectedReport, setSelectedReport] = React.useState<any>(null);
  const isRTL = language === 'ar';

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'performance':
        return 'bg-blue-100 text-blue-800';
      case 'financial':
        return 'bg-green-100 text-green-800';
      case 'hr':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {reports.map((report, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">
                {isRTL ? report.titleAr : report.titleEn}
              </h3>
              <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                <span className={`px-2 py-1 rounded-full ${getReportTypeColor(report.type)}`}>
                  {isRTL ? report.typeAr : report.typeEn}
                </span>
                <span>{isRTL ? report.dateAr : report.dateEn}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedReport(report)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title={isRTL ? 'عرض' : 'View'}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title={isRTL ? 'تحميل' : 'Download'}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <ReportViewer
              report={selectedReport}
              onClose={() => setSelectedReport(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};