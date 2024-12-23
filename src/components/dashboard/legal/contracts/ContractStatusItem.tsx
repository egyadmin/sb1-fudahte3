import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, AlertCircle } from 'lucide-react';

interface ContractStatusItemProps {
  titleEn: string;
  titleAr: string;
  statusEn: string;
  statusAr: string;
  expiryDateEn: string;
  expiryDateAr: string;
  status: 'active' | 'expiring' | 'expired';
}

export const ContractStatusItem: React.FC<ContractStatusItemProps> = ({
  titleEn,
  titleAr,
  statusEn,
  statusAr,
  expiryDateEn,
  expiryDateAr,
  status
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const statusStyles = {
    active: 'bg-green-100 text-green-800',
    expiring: 'bg-yellow-100 text-yellow-800',
    expired: 'bg-red-100 text-red-800'
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{isRTL ? titleAr : titleEn}</h4>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{isRTL ? expiryDateAr : expiryDateEn}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[status]}`}>
          {isRTL ? statusAr : statusEn}
        </span>
      </div>
    </div>
  );
};