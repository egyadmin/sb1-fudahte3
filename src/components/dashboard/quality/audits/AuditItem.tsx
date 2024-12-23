import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, BarChart } from 'lucide-react';

interface AuditItemProps {
  titleEn: string;
  titleAr: string;
  dateEn: string;
  dateAr: string;
  statusEn: string;
  statusAr: string;
  score: number;
}

export const AuditItem: React.FC<AuditItemProps> = ({
  titleEn,
  titleAr,
  dateEn,
  dateAr,
  statusEn,
  statusAr,
  score
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{isRTL ? titleAr : titleEn}</h4>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{isRTL ? dateAr : dateEn}</span>
          </div>
        </div>
        <div className="flex items-center">
          <BarChart className="w-4 h-4 mr-1 text-indigo-600" />
          <span className="font-medium">{score}%</span>
        </div>
      </div>
      <div className="mt-2">
        <span className="text-sm px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
          {isRTL ? statusAr : statusEn}
        </span>
      </div>
    </div>
  );
};