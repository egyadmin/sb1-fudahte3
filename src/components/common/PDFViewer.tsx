import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FileText, Download, X } from 'lucide-react';

interface PDFViewerProps {
  url: string;
  title?: string;
  onClose?: () => void;
  onDownload?: () => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  title,
  onClose,
  onDownload
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              {title || (isRTL ? 'عرض PDF' : 'View PDF')}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {onDownload && (
              <button
                onClick={onDownload}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title={isRTL ? 'تحميل' : 'Download'}
              >
                <Download className="w-5 h-5 text-gray-500" />
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title={isRTL ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 min-h-0">
          <iframe
            src={`${url}#toolbar=0`}
            className="w-full h-full rounded-b-lg"
            title={title || 'PDF Viewer'}
          />
        </div>
      </div>
    </div>
  );
};