import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { X, Printer, Download } from 'lucide-react';

interface PrintPreviewHeaderProps {
  onClose: () => void;
  onPrint: () => void;
  onDownload?: () => void;
}

export const PrintPreviewHeader: React.FC<PrintPreviewHeaderProps> = ({
  onClose,
  onPrint,
  onDownload
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="flex items-center justify-between p-4 border-b bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-900">
        {isRTL ? 'معاينة الطباعة' : 'Print Preview'}
      </h3>
      <div className="flex items-center gap-2">
        {onDownload && (
          <button
            onClick={onDownload}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'تحميل PDF' : 'Download PDF'}
          </button>
        )}
        <button
          onClick={onPrint}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Printer className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'طباعة' : 'Print'}
        </button>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};