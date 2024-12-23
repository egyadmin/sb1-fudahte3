import React from 'react';
import { HeadquartersPlanning } from './headquarters/HeadquartersPlanning';
import { OperationsExecution } from './operations/OperationsExecution';
import { MonitoringControl } from './monitoring/MonitoringControl';
import { StrategicForm } from './forms/StrategicForm';

export const StrategicPlanning: React.FC = () => {
  return (
    <div className="space-y-6">
      <StrategicForm />
      <HeadquartersPlanning />
      <OperationsExecution />
      <MonitoringControl />
    </div>
  );
};