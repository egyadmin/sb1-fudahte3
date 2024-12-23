import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { FileText, Calendar, X } from 'lucide-react';

interface ReportViewerProps {
  report: {
    titleEn: string;
    titleAr: string;
    typeEn: string;
    typeAr: string;
    dateEn: string;
    dateAr: string;
    contentEn?: string;
    contentAr?: string;
  };
  onClose: () => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ report, onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-xl font-semibold">
            {isRTL ? report.titleAr : report.titleEn}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{isRTL ? report.dateAr : report.dateEn}</span>
        </div>
        <span className="px-2 py-1 bg-gray-100 rounded-full">
          {isRTL ? report.typeAr : report.typeEn}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2 text-gray-900">
            {isRTL ? 'النص باللغة العربية' : 'Arabic Text'}
          </h4>
          <div 
            className="prose prose-sm max-w-none rtl"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: report.contentAr || '' }}
          />
        </div>

        <div>
          <h4 className="font-medium mb-2 text-gray-900">
            {isRTL ? 'النص باللغة الإنجليزية' : 'English Text'}
          </h4>
          <div 
            className="prose prose-sm max-w-none ltr"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: report.contentEn || '' }}
          />
        </div>
      </div>
    </div>
  );
};