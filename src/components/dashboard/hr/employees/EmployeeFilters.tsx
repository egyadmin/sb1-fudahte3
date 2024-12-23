import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Filter } from 'lucide-react';

interface EmployeeFiltersProps {
  departmentFilter: string;
  setDepartmentFilter: (department: string) => void;
}

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({ 
  departmentFilter, 
  setDepartmentFilter 
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const departments = [
    { value: 'all', labelEn: 'All Departments', labelAr: 'جميع الأقسام' },
    { value: 'Technology', labelEn: 'Technology', labelAr: 'التكنولوجيا' },
    { value: 'HR', labelEn: 'Human Resources', labelAr: 'الموارد البشرية' },
    { value: 'Finance', labelEn: 'Finance', labelAr: 'المالية' },
    { value: 'Marketing', labelEn: 'Marketing', labelAr: 'التسويق' }
  ];

  return (
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <select
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
      >
        {departments.map((dept) => (
          <option key={dept.value} value={dept.value}>
            {isRTL ? dept.labelAr : dept.labelEn}
          </option>
        ))}
      </select>
    </div>
  );
};