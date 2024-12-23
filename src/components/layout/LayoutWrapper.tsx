import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Watermark } from '../common/Watermark';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { language } = useLanguage();
  
  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-gray-50 overflow-x-hidden relative"
    >
      <Watermark />
      {children}
    </div>
  );
};