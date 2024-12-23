import { useState } from 'react';
import { supabase } from '../lib/supabase/client';
import { useToast } from './useToast';
import { useLanguage } from '../contexts/LanguageContext';

interface UseFileUploadOptions {
  maxSize?: number; // in MB
  allowedTypes?: string[];
  bucket?: string;
}

export const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const { maxSize = 10, allowedTypes = ['application/pdf'], bucket = 'documents' } = options;
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      showToast(
        isRTL 
          ? `حجم الملف يجب أن يكون أقل من ${maxSize}MB` 
          : `File size must be less than ${maxSize}MB`,
        'error'
      );
      return false;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      showToast(
        isRTL 
          ? 'نوع الملف غير مدعوم' 
          : 'File type not supported',
        'error'
      );
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File): Promise<string> => {
    try {
      if (!validateFile(file)) {
        throw new Error('Invalid file');
      }

      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      showToast(
        isRTL 
          ? 'تم رفع الملف بنجاح' 
          : 'File uploaded successfully',
        'success'
      );

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      showToast(
        isRTL 
          ? 'حدث خطأ أثناء رفع الملف' 
          : 'Error uploading file',
        'error'
      );
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading };
};