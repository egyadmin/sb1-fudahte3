import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { PDFUploadCard } from '../../../common/PDFUploadCard';
import { useFileUpload } from '../../../../hooks/useFileUpload';

interface DocumentUploadProps {
  onUploadComplete?: (url: string) => void;
  documentType: 'legal' | 'compliance' | 'contract';
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUploadComplete,
  documentType
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const getUploadConfig = () => {
    switch (documentType) {
      case 'legal':
        return {
          titleEn: 'Upload Legal Document',
          titleAr: 'تحميل وثيقة قانونية',
          descriptionEn: 'Upload legal documents, licenses, or certificates (PDF only, max 10MB)',
          descriptionAr: 'تحميل الوثائق القانونية أو التراخيص أو الشهادات (PDF فقط، الحد الأقصى 10 ميجابايت)'
        };
      case 'compliance':
        return {
          titleEn: 'Upload Compliance Document',
          titleAr: 'تحميل وثيقة امتثال',
          descriptionEn: 'Upload compliance reports, audits, or certifications (PDF only, max 10MB)',
          descriptionAr: 'تحميل تقارير الامتثال أو التدقيق أو الشهادات (PDF فقط، الحد الأقصى 10 ميجابايت)'
        };
      case 'contract':
        return {
          titleEn: 'Upload Contract',
          titleAr: 'تحميل العقد',
          descriptionEn: 'Upload contracts, agreements, or legal documents (PDF only, max 10MB)',
          descriptionAr: 'تحميل العقود أو الاتفاقيات أو المستندات القانونية (PDF فقط، الحد الأقصى 10 ميجابايت)'
        };
    }
  };

  const config = getUploadConfig();

  return (
    <PDFUploadCard
      title={isRTL ? config.titleAr : config.titleEn}
      description={isRTL ? config.descriptionAr : config.descriptionEn}
      onUploadComplete={onUploadComplete}
      maxSize={10}
    />
  );
};