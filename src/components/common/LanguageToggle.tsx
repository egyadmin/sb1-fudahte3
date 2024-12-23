import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="flex items-center px-4 py-2 text-white hover:bg-indigo-700 rounded-lg transition-colors"
      aria-label={isRTL ? 'تغيير اللغة' : 'Change Language'}
    >
      <Globe className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};