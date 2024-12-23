import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Monitor } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { THEME_MODES } from '../../../lib/supabase/settings/constants';

interface ThemeSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const options = [
    { value: THEME_MODES.SYSTEM, labelEn: 'System', labelAr: 'النظام' },
    { value: THEME_MODES.LIGHT, labelEn: 'Light', labelAr: 'فاتح' },
    { value: THEME_MODES.DARK, labelEn: 'Dark', labelAr: 'داكن' }
  ];

  return (
    <SettingsSection
      icon={Monitor}
      titleEn="Display"
      titleAr="العرض"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};