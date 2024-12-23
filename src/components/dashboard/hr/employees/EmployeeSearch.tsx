import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Search } from 'lucide-react';

interface EmployeeSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ searchTerm, setSearchTerm }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={isRTL ? 'البحث عن موظف...' : 'Search employees...'}
        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
      />
    </div>
  );
};