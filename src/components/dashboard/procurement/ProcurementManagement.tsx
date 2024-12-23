import React, { useState } from 'react';
import { SupplierList } from './suppliers/SupplierList';
import { ContractOverview } from './contracts/ContractOverview';
import { SupplyChainStatus } from './supply/SupplyChainStatus';
import { SupplierForm } from './forms/SupplierForm';
import { ContractForm } from './forms/ContractForm';
import { SupplyChainForm } from './forms/SupplyChainForm';

export const ProcurementManagement = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const renderForm = () => {
    switch (activeForm) {
      case 'supplier':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SupplierForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'contract':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ContractForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'supply':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SupplyChainForm onClose={() => setActiveForm(null)} />
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
          <SupplierList onAddSupplier={() => setActiveForm('supplier')} />
        </div>
        <div className="space-y-6">
          <ContractOverview onAddContract={() => setActiveForm('contract')} />
          <SupplyChainStatus onAddSupply={() => setActiveForm('supply')} />
        </div>
      </div>
    </div>
  );
};