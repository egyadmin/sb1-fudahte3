import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Building2 } from 'lucide-react';

export const Watermark: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] transform -rotate-12">
        <div className="flex flex-col items-center justify-center gap-8 scale-150">
          <Building2 className="w-64 h-64" />
          <div className={`text-6xl font-bold whitespace-nowrap ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'نظام إدارة العمليات' : 'Operations Management System'}
          </div>
          <div className="text-3xl font-medium text-gray-500">
            {isRTL ? 'م. محمد دحيم الحربي' : 'Eng. Mohammed Duhim Alharbi'}
          </div>
        </div>
      </div>
    </div>
  );
};