import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Eye } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { ACCESSIBILITY_MODES } from '../../../lib/supabase/settings/constants';

interface AccessibilitySectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const AccessibilitySection: React.FC<AccessibilitySectionProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const options = [
    { value: ACCESSIBILITY_MODES.DEFAULT, labelEn: 'Default', labelAr: 'افتراضي' },
    { value: ACCESSIBILITY_MODES.LARGE, labelEn: 'Large Text', labelAr: 'نص كبير' },
    { value: ACCESSIBILITY_MODES.HIGH_CONTRAST, labelEn: 'High Contrast', labelAr: 'تباين عالي' }
  ];

  return (
    <SettingsSection
      icon={Eye}
      titleEn="Accessibility"
      titleAr="إمكانية الوصول"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};