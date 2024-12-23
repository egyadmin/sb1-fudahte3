import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { FileText } from 'lucide-react';

export const ReportsHeader = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="flex items-center mb-4">
      <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
      <h2 className="text-xl font-semibold">
        {isRTL ? 'التقارير' : 'Reports'}
      </h2>
    </div>
  );
};