import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  titleEn: string;
  titleAr: string;
  color: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  titleEn,
  titleAr,
  color,
  onClick,
  loading = false,
  disabled = false
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${color} p-4 rounded-lg transition-all duration-200
        flex items-center justify-center space-x-2 group
        ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
      ) : (
        <Icon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
      )}
      <span className="font-medium whitespace-nowrap">
        {isRTL ? titleAr : titleEn}
      </span>
    </button>
  );
};