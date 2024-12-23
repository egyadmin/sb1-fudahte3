import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useTransactions } from '../../../../hooks/useTransactions';
import { TransactionItem } from './TransactionItem';

export const TransactionList: React.FC = () => {
  const { language } = useLanguage();
  const { transactions } = useTransactions();
  const isRTL = language === 'ar';

  return (
    <div className="mt-6 space-y-4">
      {transactions.map((transaction, index) => (
        <TransactionItem
          key={index}
          idEn={transaction.idEn}
          idAr={transaction.idAr}
          descriptionEn={transaction.descriptionEn}
          descriptionAr={transaction.descriptionAr}
          amount={transaction.amount}
          type={transaction.type}
          dateEn={transaction.dateEn}
          dateAr={transaction.dateAr}
        />
      ))}
    </div>
  );
};