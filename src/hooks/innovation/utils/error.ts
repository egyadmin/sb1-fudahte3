import { useCallback } from 'react';
import { useToast } from '../../useToast';
import { useLanguage } from '../../../contexts/LanguageContext';
import { InnovationError } from '../../../lib/supabase/innovation/utils/error';

export const useInnovationError = () => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const handleError = useCallback((
    error: unknown,
    defaultMessageEn: string,
    defaultMessageAr: string
  ) => {
    console.error('Innovation Error:', error);
    
    const message = error instanceof InnovationError 
      ? error.message 
      : (isRTL ? defaultMessageAr : defaultMessageEn);
    
    showToast(message, 'error');
  }, [isRTL, showToast]);

  const handleSuccess = useCallback((messageEn: string, messageAr: string) => {
    showToast(isRTL ? messageAr : messageEn, 'success');
  }, [isRTL, showToast]);

  return { handleError, handleSuccess };
};