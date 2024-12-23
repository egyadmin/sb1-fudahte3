import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Settings, Moon, Sun, Bell, Eye, Monitor } from 'lucide-react';

export const SettingsPopover = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = language === 'ar';

  const settings = [
    {
      icon: Monitor,
      titleEn: 'Display',
      titleAr: 'العرض',
      options: [
        { value: 'system', labelEn: 'System', labelAr: 'النظام' },
        { value: 'light', labelEn: 'Light', labelAr: 'فاتح' },
        { value: 'dark', labelEn: 'Dark', labelAr: 'داكن' }
      ]
    },
    {
      icon: Bell,
      titleEn: 'Notifications',
      titleAr: 'الإشعارات',
      options: [
        { value: 'all', labelEn: 'All', labelAr: 'الكل' },
        { value: 'important', labelEn: 'Important Only', labelAr: 'المهم فقط' },
        { value: 'none', labelEn: 'None', labelAr: 'لا شيء' }
      ]
    },
    {
      icon: Eye,
      titleEn: 'Accessibility',
      titleAr: 'إمكانية الوصول',
      options: [
        { value: 'default', labelEn: 'Default', labelAr: 'افتراضي' },
        { value: 'large', labelEn: 'Large Text', labelAr: 'نص كبير' },
        { value: 'high-contrast', labelEn: 'High Contrast', labelAr: 'تباين عالي' }
      ]
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label={isRTL ? 'الإعدادات' : 'Settings'}
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50 ${
          isRTL ? 'left-0' : 'right-0'
        }`}>
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {isRTL ? 'الإعدادات' : 'Settings'}
            </h3>
          </div>

          <div className="p-4 space-y-6">
            {settings.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <Icon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span>{isRTL ? section.titleAr : section.titleEn}</span>
                  </div>
                  <select className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    {section.options.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {isRTL ? option.labelAr : option.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
            <button className="w-full px-4 py-2 text-sm text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
              {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};