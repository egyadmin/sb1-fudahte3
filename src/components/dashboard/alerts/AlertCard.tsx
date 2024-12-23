import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface AlertCardProps {
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  type: 'info' | 'warning' | 'error';
}

export const AlertCard: React.FC<AlertCardProps> = ({
  titleEn,
  titleAr,
  messageEn,
  messageAr,
  type
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const typeStyles = {
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200'
  };

  return (
    <div className={`p-3 rounded-md border ${typeStyles[type]} ${isRTL ? 'rtl' : 'ltr'}`}>
      <h4 className="font-medium">
        {isRTL ? titleAr : titleEn}
      </h4>
      <p className="text-sm text-gray-600 mt-1">
        {isRTL ? messageAr : messageEn}
      </p>
    </div>
  );
};