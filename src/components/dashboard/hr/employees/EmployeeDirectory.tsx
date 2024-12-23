import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useEmployees } from '../../../../hooks/useEmployees';
import { Users, Search, Filter } from 'lucide-react';
import { EmployeeGrid } from './EmployeeGrid';
import { EmployeeFilters } from './EmployeeFilters';
import { EmployeeSearch } from './EmployeeSearch';

export const EmployeeDirectory = () => {
  const { language } = useLanguage();
  const { employees } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const isRTL = language === 'ar';

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = (
      employee.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nameAr.includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDepartment = departmentFilter === 'all' || employee.departmentEn === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-semibold">
            {isRTL ? 'دليل الموظفين' : 'Employee Directory'}
          </h2>
        </div>
        <div className="flex gap-4">
          <EmployeeSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          <EmployeeFilters 
            departmentFilter={departmentFilter} 
            setDepartmentFilter={setDepartmentFilter} 
          />
        </div>
      </div>
      <EmployeeGrid employees={filteredEmployees} />
    </div>
  );
};