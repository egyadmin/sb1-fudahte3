import React, { useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  onClear?: () => void;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  onClear,
  accept = '.pdf',
  maxSize = 10,
  label
}) => {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isRTL = language === 'ar';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(isRTL 
          ? `حجم الملف يجب أن يكون أقل من ${maxSize}MB` 
          : `File size must be less than ${maxSize}MB`
        );
        return;
      }
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer"
      >
        {selectedFile ? (
          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Upload className="w-5 h-5 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">{selectedFile.name}</span>
            </div>
            {onClear && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        ) : (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors">
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                {isRTL ? 'انقر لتحميل ملف' : 'Click to upload file'}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {isRTL 
                  ? `الحد الأقصى لحجم الملف: ${maxSize}MB` 
                  : `Maximum file size: ${maxSize}MB`}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};