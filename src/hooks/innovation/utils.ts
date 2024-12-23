import { useCallback } from 'react';
import { useToast } from '../useToast';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatErrorMessage } from '../../lib/supabase/innovation/utils';

export const useInnovationError = () => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const handleError = useCallback((error: unknown, messageEn: string, messageAr: string) => {
    console.error(messageEn, error);
    showToast(
      isRTL ? messageAr : messageEn,
      'error'
    );
  }, [isRTL, showToast]);

  const handleSuccess = useCallback((messageEn: string, messageAr: string) => {
    showToast(
      isRTL ? messageAr : messageEn,
      'success'
    );
  }, [isRTL, showToast]);

  return { handleError, handleSuccess };
};