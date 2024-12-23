import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { PDFUploadCard } from '../../../../common/PDFUploadCard';
import { FileText, Plus } from 'lucide-react';

interface TrainingMaterialsProps {
  onUploadComplete: (url: string) => void;
}

export const TrainingMaterials: React.FC<TrainingMaterialsProps> = ({
  onUploadComplete
}) => {
  const { language } = useLanguage();
  const [showUpload, setShowUpload] = useState(false);
  const isRTL = language === 'ar';

  const handleUploadComplete = (url: string) => {
    onUploadComplete(url);
    setShowUpload(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">
          {isRTL ? 'مواد التدريب' : 'Training Materials'}
        </h4>
        {!showUpload && (
          <button
            type="button"
            onClick={() => setShowUpload(true)}
            className="flex items-center text-sm text-primary-600 hover:text-primary-700"
          >
            <Plus className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
            {isRTL ? 'إضافة مواد' : 'Add Materials'}
          </button>
        )}
      </div>

      {showUpload && (
        <PDFUploadCard
          title={isRTL ? 'تحميل مواد التدريب' : 'Upload Training Materials'}
          description={isRTL 
            ? 'قم بتحميل المواد التدريبية بتنسيق PDF (الحد الأقصى 10 ميجابايت)' 
            : 'Upload training materials in PDF format (Max 10MB)'}
          onUploadComplete={handleUploadComplete}
          maxSize={10}
        />
      )}
    </div>
  );
};