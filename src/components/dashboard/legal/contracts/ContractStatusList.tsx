import React from 'react';
import { useContracts } from '../../../../hooks/useContracts';
import { ContractStatusItem } from './ContractStatusItem';

export const ContractStatusList: React.FC = () => {
  const { contracts } = useContracts();
  
  return (
    <div className="space-y-3 mt-4">
      {contracts.map((contract) => (
        <ContractStatusItem key={contract.id} {...contract} />
      ))}
    </div>
  );
};