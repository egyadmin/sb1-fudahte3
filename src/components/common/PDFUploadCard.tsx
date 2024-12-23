import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FileUploadButton } from './FileUploadButton';
import { PDFViewer } from './PDFViewer';
import { useFileUpload } from '../../hooks/useFileUpload';

interface PDFUploadCardProps {
  title?: string;
  description?: string;
  onUploadComplete?: (url: string) => void;
  maxSize?: number;
}

export const PDFUploadCard: React.FC<PDFUploadCardProps> = ({
  title,
  description,
  onUploadComplete,
  maxSize = 10
}) => {
  const { language } = useLanguage();
  const { uploadFile, uploading } = useFileUpload({
    maxSize,
    allowedTypes: ['application/pdf']
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const isRTL = language === 'ar';

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    try {
      const url = await uploadFile(file);
      setUploadedUrl(url);
      onUploadComplete?.(url);
    } catch (error) {
      setSelectedFile(null);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploadedUrl(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Upload Button */}
      <FileUploadButton
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        onClear={handleClear}
        accept=".pdf"
        maxSize={maxSize}
      />

      {/* Preview Button */}
      {uploadedUrl && (
        <button
          onClick={() => setShowPreview(true)}
          className="mt-4 w-full px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
        >
          {isRTL ? 'معاينة الملف' : 'Preview File'}
        </button>
      )}

      {/* PDF Preview Modal */}
      {showPreview && uploadedUrl && (
        <PDFViewer
          url={uploadedUrl}
          title={selectedFile?.name}
          onClose={() => setShowPreview(false)}
          onDownload={() => window.open(uploadedUrl, '_blank')}
        />
      )}
    </div>
  );
};