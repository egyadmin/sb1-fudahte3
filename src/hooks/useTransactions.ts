import { useMemo } from 'react';

export const useTransactions = () => {
  const transactions = useMemo(() => [
    {
      idEn: 'TRX-001',
      idAr: 'معاملة-001',
      descriptionEn: 'Software License Payment',
      descriptionAr: 'دفع رخصة البرمجيات',
      amount: 12500,
      type: 'expense',
      dateEn: 'March 15, 2024',
      dateAr: '١٥ مارس ٢٠٢٤'
    },
    {
      idEn: 'TRX-002',
      idAr: 'معاملة-002',
      descriptionEn: 'Marketing Campaign',
      descriptionAr: 'حملة تسويقية',
      amount: 45000,
      type: 'expense',
      dateEn: 'March 14, 2024',
      dateAr: '١٤ مارس ٢٠٢٤'
    }
  ], []);

  return { transactions };
};