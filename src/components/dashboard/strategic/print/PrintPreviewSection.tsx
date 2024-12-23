import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { LucideIcon } from 'lucide-react';

interface PrintPreviewSectionProps {
  icon: LucideIcon;
  titleEn: string;
  titleAr: string;
  children: React.ReactNode;
  className?: string;
}

export const PrintPreviewSection: React.FC<PrintPreviewSectionProps> = ({
  icon: Icon,
  titleEn,
  titleAr,
  children,
  className = ''
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <section className={`print-section print-avoid-break ${className}`}>
      <div className="flex items-center mb-4">
        <Icon className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h2 className="text-xl font-bold text-gray-900">
          {isRTL ? titleAr : titleEn}
        </h2>
      </div>
      {children}
    </section>
  );
};