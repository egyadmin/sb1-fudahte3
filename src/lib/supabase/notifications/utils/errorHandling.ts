import { useToast } from '../../../../hooks/useToast';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const useNotificationErrorHandler = () => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const handleError = (error: unknown, silent = false) => {
    // Don't show toast for network or auth errors if silent is true
    if (silent && error instanceof Error && (
      error.message.includes('Failed to fetch') ||
      error.message.includes('auth')
    )) {
      return;
    }

    // Show toast for other errors
    if (error instanceof Error && !error.message.includes('Failed to fetch')) {
      showToast(
        isRTL ? 'حدث خطأ أثناء معالجة الإشعارات' : 'Error processing notifications',
        'error'
      );
    }
  };

  return { handleError };
};