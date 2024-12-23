import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TransactionItemProps {
  idEn: string;
  idAr: string;
  descriptionEn: string;
  descriptionAr: string;
  amount: number;
  type: 'income' | 'expense';
  dateEn: string;
  dateAr: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  idEn,
  idAr,
  descriptionEn,
  descriptionAr,
  amount,
  type,
  dateEn,
  dateAr
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${type === 'income' ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
          {type === 'income' ? (
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          )}
        </div>
        <div>
          <p className="font-medium">{isRTL ? descriptionAr : descriptionEn}</p>
          <p className="text-sm text-gray-500">{isRTL ? idAr : idEn}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {type === 'income' ? '+' : '-'}${amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">{isRTL ? dateAr : dateEn}</p>
      </div>
    </div>
  );
};