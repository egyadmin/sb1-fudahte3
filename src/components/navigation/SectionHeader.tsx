import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { menuItems } from '../../data/menuItems';
import * as Icons from 'lucide-react';

export const SectionHeader = () => {
  const { language } = useLanguage();
  const { activeSection } = useNavigation();
  const isRTL = language === 'ar';
  
  const currentSection = menuItems.find(item => item.id === activeSection);
  const IconComponent = currentSection ? Icons[currentSection.icon as keyof typeof Icons] : null;

  if (!currentSection) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center">
        {IconComponent && (
          <IconComponent className={`w-6 h-6 text-indigo-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
        )}
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? currentSection.titleEn : currentSection.titleAr}
        </h1>
      </div>
      <p className="mt-2 text-gray-600">
        {language === 'en' ? currentSection.descriptionEn : currentSection.descriptionAr}
      </p>
    </div>
  );
};