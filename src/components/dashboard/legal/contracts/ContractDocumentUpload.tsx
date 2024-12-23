import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { PDFUploadCard } from '../../../common/PDFUploadCard';
import { DocumentPreview } from '../documents/DocumentPreview';

interface ContractDocumentUploadProps {
  onUploadComplete: (url: string) => void;
}

export const ContractDocumentUpload: React.FC<ContractDocumentUploadProps> = ({
  onUploadComplete
}) => {
  const { language } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isRTL = language === 'ar';

  const handleUploadComplete = (url: string) => {
    onUploadComplete(url);
    setPreviewUrl(url);
  };

  return (
    <div className="space-y-4">
      <PDFUploadCard
        title={isRTL ? 'تحميل العقد' : 'Upload Contract'}
        description={isRTL 
          ? 'قم بتحميل نسخة PDF من العقد (الحد الأقصى 10 ميجابايت)' 
          : 'Upload a PDF version of the contract (Max 10MB)'}
        onUploadComplete={handleUploadComplete}
      />

      {previewUrl && (
        <DocumentPreview
          url={previewUrl}
          title={isRTL ? 'معاينة العقد' : 'Contract Preview'}
          onClose={() => setPreviewUrl(null)}
        />
      )}
    </div>
  );
};