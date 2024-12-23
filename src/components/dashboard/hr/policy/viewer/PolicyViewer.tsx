import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { FileText, Calendar, Clock } from 'lucide-react';

interface PolicyViewerProps {
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  effectiveDate: string;
  version: string;
  onClose: () => void;
}

export const PolicyViewer: React.FC<PolicyViewerProps> = ({
  titleEn,
  titleAr,
  contentEn,
  contentAr,
  effectiveDate,
  version,
  onClose
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-xl font-semibold">
            {isRTL ? titleAr : titleEn}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          {isRTL ? 'إغلاق' : 'Close'}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{effectiveDate}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{version}</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2 text-gray-900">
            {isRTL ? 'النص باللغة العربية' : 'Arabic Text'}
          </h4>
          <div 
            className="prose prose-sm max-w-none rtl"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: contentAr }}
          />
        </div>

        <div>
          <h4 className="font-medium mb-2 text-gray-900">
            {isRTL ? 'النص باللغة الإنجليزية' : 'English Text'}
          </h4>
          <div 
            className="prose prose-sm max-w-none ltr"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: contentEn }}
          />
        </div>
      </div>
    </div>
  );
};