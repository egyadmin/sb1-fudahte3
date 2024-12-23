import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { menuItems } from '../data/menuItems';
import * as Icons from 'lucide-react';

export const Sidebar = () => {
  const { language } = useLanguage();
  
  return (
    <aside className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0 overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          {language === 'en' ? 'Admin Panel' : 'لوحة الإدارة'}
        </h1>
        <nav>
          {menuItems.map((item) => {
            const IconComponent = Icons[item.icon as keyof typeof Icons];
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2 transition-colors"
              >
                {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
                <span>{language === 'en' ? item.titleEn : item.titleAr}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};