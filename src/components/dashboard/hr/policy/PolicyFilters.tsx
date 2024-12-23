import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Filter } from 'lucide-react';

export const PolicyFilters = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white">
      <option value="all">{isRTL ? 'جميع الفئات' : 'All Categories'}</option>
      <option value="general">{isRTL ? 'عام' : 'General'}</option>
      <option value="hr">{isRTL ? 'الموارد البشرية' : 'HR'}</option>
      <option value="finance">{isRTL ? 'المالية' : 'Finance'}</option>
      <option value="it">{isRTL ? 'تكنولوجيا المعلومات' : 'IT'}</option>
    </select>
  );
};