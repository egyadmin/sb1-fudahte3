import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Calendar } from 'lucide-react';
import { useProgressReports } from '../../../../hooks/useProgressReports';

export const ProgressReports: React.FC = () => {
  const { language } = useLanguage();
  const { reports } = useProgressReports();
  const isRTL = language === 'ar';

  return (
    <div className="bg-purple-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <FileText className={`w-5 h-5 text-purple-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'مراجعة التقارير الدورية' : 'Progress Reports Review'}
        </h3>
      </div>
      <div className="space-y-4">
        {reports.map((report, index) => (
          <div key={index} className="bg-white p-3 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">
                {isRTL ? report.titleAr : report.titleEn}
              </h4>
              <span className={`px-2 py-1 text-sm rounded-full ${
                report.status === 'approved' ? 'bg-green-100 text-green-800' :
                report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {isRTL ? report.statusAr : report.statusEn}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{isRTL ? report.dateAr : report.dateEn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};