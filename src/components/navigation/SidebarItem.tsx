import React from 'react';
import { MenuItem } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigation } from '../../contexts/NavigationContext';
import * as Icons from 'lucide-react';

interface SidebarItemProps {
  item: MenuItem;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const { language } = useLanguage();
  const { activeSection, setActiveSection } = useNavigation();
  const IconComponent = Icons[item.icon as keyof typeof Icons];
  const isActive = activeSection === item.id;
  const isRTL = language === 'ar';

  return (
    <button
      onClick={() => setActiveSection(item.id)}
      className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 group relative
        ${isActive 
          ? 'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-50'}`}
    >
      <div className={`flex items-center ${isRTL ? 'mr-3' : 'ml-3'}`}>
        {IconComponent && (
          <div className={`p-2 rounded-lg transition-all duration-300 transform group-hover:scale-110 ${
            isActive 
              ? 'bg-indigo-100 shadow-sm' 
              : 'bg-gray-100 group-hover:bg-indigo-50'
          }`}>
            <IconComponent 
              className={`w-5 h-5 transition-colors duration-300 ${
                isActive 
                  ? 'text-indigo-600' 
                  : 'text-gray-500 group-hover:text-indigo-500'
              }`} 
            />
          </div>
        )}
        <span className={`font-medium ${isRTL ? 'mr-3' : 'ml-3'} transition-colors duration-300`}>
          {language === 'en' ? item.titleEn : item.titleAr}
        </span>
      </div>
      {isActive && (
        <div className={`absolute w-1 h-8 bg-indigo-600 rounded-full transform transition-all duration-300
          ${isRTL ? 'right-0 -mr-4' : 'left-0 -ml-4'}`} 
        />
      )}
    </button>
  );
};