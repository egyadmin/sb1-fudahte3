import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Users, UserPlus, FileText, BarChart2 } from 'lucide-react';

interface HRTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const HRTabs: React.FC<HRTabsProps> = ({ activeTab, setActiveTab }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const tabs = [
    {
      id: 'recruitment',
      titleEn: 'Recruitment',
      titleAr: 'التوظيف',
      icon: UserPlus
    },
    {
      id: 'employees',
      titleEn: 'Employees',
      titleAr: 'الموظفين',
      icon: Users
    },
    {
      id: 'policies',
      titleEn: 'Policies',
      titleAr: 'السياسات',
      icon: FileText
    },
    {
      id: 'performance',
      titleEn: 'Performance',
      titleAr: 'الأداء',
      icon: BarChart2
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-2">
      <div className="flex space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span className="font-medium">
                {isRTL ? tab.titleAr : tab.titleEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};