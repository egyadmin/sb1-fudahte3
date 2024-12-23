import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Settings, Moon, Sun, Bell, Eye, Monitor } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { useSettings } from '../../../hooks/useSettings';

export const SettingsPopover = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { settings, loading, updateSettings } = useSettings();
  const isRTL = language === 'ar';

  const sections = [
    {
      icon: Monitor,
      titleEn: 'Display',
      titleAr: 'العرض',
      key: 'theme',
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
      key: 'notifications',
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
      key: 'accessibility',
      options: [
        { value: 'default', labelEn: 'Default', labelAr: 'افتراضي' },
        { value: 'large', labelEn: 'Large Text', labelAr: 'نص كبير' },
        { value: 'high-contrast', labelEn: 'High Contrast', labelAr: 'تباين عالي' }
      ]
    }
  ];

  const handleSave = async () => {
    if (!settings) return;
    await updateSettings(settings);
    setIsOpen(false);
  };

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
            {sections.map((section, index) => (
              <SettingsSection
                key={index}
                icon={section.icon}
                titleEn={section.titleEn}
                titleAr={section.titleAr}
                options={section.options}
                value={settings?.[section.key] || section.options[0].value}
                onChange={(value) => updateSettings({ [section.key]: value })}
              />
            ))}
          </div>

          <div className="p-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full px-4 py-2 text-sm text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {isRTL ? 'جاري الحفظ...' : 'Saving...'}
                </span>
              ) : (
                isRTL ? 'حفظ التغييرات' : 'Save Changes'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};