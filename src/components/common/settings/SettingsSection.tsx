import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { LucideIcon } from 'lucide-react';

interface SettingOption {
  value: string;
  labelEn: string;
  labelAr: string;
}

interface SettingsSectionProps {
  icon: LucideIcon;
  titleEn: string;
  titleAr: string;
  options: SettingOption[];
  value: string;
  onChange: (value: string) => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  icon: Icon,
  titleEn,
  titleAr,
  options,
  value,
  onChange
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="space-y-2">
      <div className="flex items-center text-sm font-medium text-gray-900">
        <Icon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <span>{isRTL ? titleAr : titleEn}</span>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {isRTL ? option.labelAr : option.labelEn}
          </option>
        ))}
      </select>
    </div>
  );
};