import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Calendar, DollarSign } from 'lucide-react';

interface ContractItemProps {
  supplierIdEn: string;
  supplierIdAr: string;
  titleEn: string;
  titleAr: string;
  value: number;
  startDateEn: string;
  startDateAr: string;
  endDateEn: string;
  endDateAr: string;
  status: 'active' | 'pending' | 'expired';
}

export const ContractItem: React.FC<ContractItemProps> = ({
  supplierIdEn,
  supplierIdAr,
  titleEn,
  titleAr,
  value,
  startDateEn,
  startDateAr,
  endDateEn,
  endDateAr,
  status
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{isRTL ? titleAr : titleEn}</h4>
          <p className="text-sm text-gray-500">
            {isRTL ? supplierIdAr : supplierIdEn}
          </p>
        </div>
        <div className="flex items-center text-indigo-600">
          <DollarSign className="w-4 h-4 mr-1" />
          <span className="font-medium">${value.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center text-sm text-gray-600">
        <Calendar className="w-4 h-4 mr-1" />
        <span>
          {isRTL ? startDateAr : startDateEn} - {isRTL ? endDateAr : endDateEn}
        </span>
      </div>
    </div>
  );
};