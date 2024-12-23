import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText } from 'lucide-react';
import { useSiteReports } from '../../../../hooks/useSiteReports';

export const SiteReports: React.FC = () => {
  const { language } = useLanguage();
  const { reports } = useSiteReports();
  const isRTL = language === 'ar';

  return (
    <div className="bg-indigo-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'تقارير من المواقع' : 'Site Reports'}
        </h3>
      </div>
      <div className="space-y-3">
        {reports.map((report, index) => (
          <div key={index} className="bg-white p-3 rounded-lg">
            <h4 className="font-medium text-gray-900">
              {isRTL ? report.titleAr : report.titleEn}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {isRTL ? report.siteAr : report.siteEn}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {isRTL ? report.dateAr : report.dateEn}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                report.priority === 'high' ? 'bg-red-100 text-red-800' :
                report.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {isRTL ? report.priorityAr : report.priorityEn}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};