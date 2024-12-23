import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const Header = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white shadow-sm z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          {language === 'en' ? 'Welcome to Admin Dashboard' : 'مرحباً بك في لوحة الإدارة'}
        </h2>
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>
    </header>
  );
};