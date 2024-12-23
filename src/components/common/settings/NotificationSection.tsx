import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Bell } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { NOTIFICATION_PREFERENCES } from '../../../lib/supabase/settings/constants';

interface NotificationSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const NotificationSection: React.FC<NotificationSectionProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const options = [
    { value: NOTIFICATION_PREFERENCES.ALL, labelEn: 'All', labelAr: 'الكل' },
    { value: NOTIFICATION_PREFERENCES.IMPORTANT, labelEn: 'Important Only', labelAr: 'المهم فقط' },
    { value: NOTIFICATION_PREFERENCES.NONE, labelEn: 'None', labelAr: 'لا شيء' }
  ];

  return (
    <SettingsSection
      icon={Bell}
      titleEn="Notifications"
      titleAr="الإشعارات"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};