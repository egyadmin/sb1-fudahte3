import React, { useState } from 'react';
import { BudgetOverview } from './budget/BudgetOverview';
import { TransactionHistory } from './transactions/TransactionHistory';
import { FinancialReports } from './reports/FinancialReports';
import { BudgetForm } from './budget/BudgetForm';
import { CashFlowForm } from './forms/CashFlowForm';
import { ReportGeneratorForm } from './forms/ReportGeneratorForm';

export const FinancialManagement = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const renderForm = () => {
    switch (activeForm) {
      case 'budget':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <BudgetForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'cashflow':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <CashFlowForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'report':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ReportGeneratorForm onClose={() => setActiveForm(null)} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderForm()}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BudgetOverview onAddBudget={() => setActiveForm('budget')} />
        </div>
        <div className="space-y-6">
          <TransactionHistory onAddTransaction={() => setActiveForm('cashflow')} />
          <FinancialReports onGenerateReport={() => setActiveForm('report')} />
        </div>
      </div>
    </div>
  );
};