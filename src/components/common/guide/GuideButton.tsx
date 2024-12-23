import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { GuideContent } from './GuideContent';
import { useLanguage } from '../../../contexts/LanguageContext';

export const GuideButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${isRTL ? 'left-6' : 'right-6'} bottom-6 p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-200 z-50`}
        aria-label={isRTL ? 'دليل المستخدم' : 'User Guide'}
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {isOpen && <GuideContent onClose={() => setIsOpen(false)} />}
    </>
  );
};