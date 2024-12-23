import React from 'react';
import { EmployeeCard } from './EmployeeCard';
import { Employee } from '../../../../types/hr';

interface EmployeeGridProps {
  employees: Employee[];
}

export const EmployeeGrid: React.FC<EmployeeGridProps> = ({ employees }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} {...employee} />
      ))}
    </div>
  );
};