import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { PDFViewer } from '../../../common/PDFViewer';

interface DocumentPreviewProps {
  url: string;
  title: string;
  onClose: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  url,
  title,
  onClose
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <PDFViewer
      url={url}
      title={title}
      onClose={onClose}
      onDownload={() => window.open(url, '_blank')}
    />
  );
};