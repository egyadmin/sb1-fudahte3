import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, Download } from 'lucide-react';

interface ReportItemProps {
  id: string;
  titleEn: string;
  titleAr: string;
  dateEn: string;
  dateAr: string;
  type: 'income' | 'expense' | 'balance';
}

export const ReportItem: React.FC<ReportItemProps> = ({
  titleEn,
  titleAr,
  dateEn,
  dateAr,
  type
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const typeStyles = {
    income: 'bg-green-100 text-green-800',
    expense: 'bg-red-100 text-red-800',
    balance: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{isRTL ? titleAr : titleEn}</h4>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{isRTL ? dateAr : dateEn}</span>
          </div>
        </div>
        <button 
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          aria-label={isRTL ? 'تحميل التقرير' : 'Download Report'}
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};