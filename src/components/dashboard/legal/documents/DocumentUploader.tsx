import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileUpload } from '../../../common/FileUpload';
import { useFileUpload } from '../../../../hooks/useFileUpload';
import { DocumentPreview } from './DocumentPreview';

interface DocumentUploaderProps {
  onUploadComplete: (url: string) => void;
  label?: string;
  maxSize?: number;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onUploadComplete,
  label,
  maxSize = 10
}) => {
  const { language } = useLanguage();
  const { uploadFile, uploading } = useFileUpload({
    maxSize,
    allowedTypes: ['application/pdf']
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isRTL = language === 'ar';

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    try {
      const url = await uploadFile(file);
      setPreviewUrl(url);
      onUploadComplete(url);
    } catch (error) {
      setSelectedFile(null);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-4">
      <FileUpload
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        onClear={handleClear}
        accept=".pdf"
        maxSize={maxSize}
        label={label}
      />

      {uploading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-500 border-t-transparent" />
        </div>
      )}

      {previewUrl && (
        <button
          onClick={() => setPreviewUrl(previewUrl)}
          className="w-full px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
        >
          {isRTL ? 'معاينة المستند' : 'Preview Document'}
        </button>
      )}

      {previewUrl && (
        <DocumentPreview
          url={previewUrl}
          title={selectedFile?.name || ''}
          onClose={() => setPreviewUrl(null)}
        />
      )}
    </div>
  );
};