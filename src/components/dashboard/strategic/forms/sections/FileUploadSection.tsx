import React, { useState } from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { FileUpload } from '../../../../common/FileUpload';
import { useFileUpload } from '../../../../../hooks/useFileUpload';
import { useToast } from '../../../../../hooks/useToast';

interface FileUploadSectionProps {
  section: 'progress' | 'quality' | 'resources' | 'timeline';
  onUploadComplete: (url: string) => void;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  section,
  onUploadComplete
}) => {
  const { language } = useLanguage();
  const { uploadFile, uploading } = useFileUpload('strategic');
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isRTL = language === 'ar';

  const getSectionLabel = () => {
    switch (section) {
      case 'progress':
        return isRTL ? 'تحميل تقرير التقدم' : 'Upload Progress Report';
      case 'quality':
        return isRTL ? 'تحميل تقرير الجودة' : 'Upload Quality Report';
      case 'resources':
        return isRTL ? 'تحميل خطة الموارد' : 'Upload Resource Plan';
      case 'timeline':
        return isRTL ? 'تحميل الجدول الزمني' : 'Upload Timeline';
    }
  };

  const handleFileSelect = async (file: File) => {
    try {
      setSelectedFile(file);
      const url = await uploadFile(file);
      onUploadComplete(url);
      showToast(
        isRTL ? 'تم رفع الملف بنجاح' : 'File uploaded successfully',
        'success'
      );
    } catch (error) {
      showToast(
        isRTL ? 'حدث خطأ أثناء رفع الملف' : 'Error uploading file',
        'error'
      );
    }
  };

  return (
    <div className="space-y-4">
      <FileUpload
        accept={section === 'timeline' ? '.xlsx,.xls' : '.pdf'}
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        onClear={() => setSelectedFile(null)}
        label={getSectionLabel()}
      />
      {uploading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600" />
          <span className="ml-2 text-sm text-gray-600">
            {isRTL ? 'جاري الرفع...' : 'Uploading...'}
          </span>
        </div>
      )}
    </div>
  );
};