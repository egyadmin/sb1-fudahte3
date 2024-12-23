import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Receipt, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { TransactionList } from './TransactionList';
import { TransactionSummary } from './TransactionSummary';

interface TransactionHistoryProps {
  onAddTransaction: () => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onAddTransaction }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Receipt className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'سجل المعاملات' : 'Transaction History'}
          </h3>
        </div>
        <button
          onClick={onAddTransaction}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة معاملة' : 'Add Transaction'}
        </button>
      </div>

      <TransactionSummary />
      <TransactionList />
    </div>
  );
};