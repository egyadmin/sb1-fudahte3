import { useMemo } from 'react';

export const useFinancialSummary = () => {
  const summary = useMemo(() => ({
    income: 250000,
    expenses: 180000,
    balance: 70000
  }), []);

  return { summary };
};