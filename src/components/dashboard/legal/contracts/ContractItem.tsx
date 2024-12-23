import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, DollarSign } from 'lucide-react';

interface ContractItemProps {
  id: string;
  titleEn: string;
  titleAr: string;
  statusEn: string;
  statusAr: string;
  value: number;
  expiryDateEn: string;
  expiryDateAr: string;
}

export const ContractItem: React.FC<ContractItemProps> = ({
  titleEn,
  titleAr,
  statusEn,
  statusAr,
  value,
  expiryDateEn,
  expiryDateAr
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
            <span>{isRTL ? expiryDateAr : expiryDateEn}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center text-indigo-600">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="font-medium">${value.toLocaleString()}</span>
          </div>
          <span className="text-sm text-gray-600 mt-1">
            {isRTL ? statusAr : statusEn}
          </span>
        </div>
      </div>
    </div>
  );
};