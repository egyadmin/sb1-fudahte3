import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Calendar } from 'lucide-react';

interface ReportCardProps {
  titleEn: string;
  titleAr: string;
  dateEn: string;
  dateAr: string;
  type: string;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  titleEn,
  titleAr,
  dateEn,
  dateAr,
  type
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="p-3 rounded-md border border-gray-200 hover:border-indigo-200 transition-colors">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">
          {isRTL ? titleAr : titleEn}
        </h4>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
          <span>{isRTL ? dateAr : dateEn}</span>
        </div>
      </div>
    </div>
  );
};