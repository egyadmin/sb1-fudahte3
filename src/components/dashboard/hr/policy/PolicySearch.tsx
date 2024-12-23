import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Search } from 'lucide-react';

export const PolicySearch = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder={isRTL ? 'البحث في السياسات...' : 'Search policies...'}
        className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};