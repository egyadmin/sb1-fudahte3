import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Printer, Eye } from 'lucide-react';
import { PrintPreview } from './PrintPreview';

export const PrintButton: React.FC = () => {
  const { language } = useLanguage();
  const [showPreview, setShowPreview] = useState(false);
  const isRTL = language === 'ar';

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          title={isRTL ? 'معاينة الطباعة' : 'Print Preview'}
        >
          <Eye className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <span>{isRTL ? 'معاينة' : 'Preview'}</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          title={isRTL ? 'طباعة التقرير' : 'Print Report'}
        >
          <Printer className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <span>{isRTL ? 'طباعة' : 'Print'}</span>
        </button>
      </div>

      {showPreview && (
        <PrintPreview
          onClose={() => setShowPreview(false)}
          onPrint={handlePrint}
        >
          <div className="print-preview">
            {/* The print layout will be rendered here */}
            <div className="print-container">
              {/* This will show the same content as the print layout */}
              <div className="print:block">
                {/* The content will be rendered through PrintLayout */}
              </div>
            </div>
          </div>
        </PrintPreview>
      )}
    </>
  );
};