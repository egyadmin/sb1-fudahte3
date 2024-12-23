import React from 'react';
import { PrintPreviewHeader } from './PrintPreviewHeader';
import { PrintPreviewContent } from './PrintPreviewContent';

interface PrintPreviewWrapperProps {
  onClose: () => void;
  onPrint: () => void;
  onDownload?: () => void;
  children: React.ReactNode;
}

export const PrintPreviewWrapper: React.FC<PrintPreviewWrapperProps> = ({
  onClose,
  onPrint,
  onDownload,
  children
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <PrintPreviewHeader
          onClose={onClose}
          onPrint={onPrint}
          onDownload={onDownload}
        />
        <div className="flex-1 overflow-auto p-8 bg-gray-100">
          <div className="bg-white shadow-md mx-auto max-w-[21cm] min-h-[29.7cm] p-[1.5cm] print:p-0 print:shadow-none">
            <PrintPreviewContent>
              {children}
            </PrintPreviewContent>
          </div>
        </div>
      </div>
    </div>
  );
};