import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ClipboardCheck } from 'lucide-react';

interface ApprovalButtonProps {
  onClick: () => void;
  count?: number;
}

export const ApprovalButton: React.FC<ApprovalButtonProps> = ({ onClick, count }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      aria-label={isRTL ? 'الموافقات' : 'Approvals'}
    >
      <ClipboardCheck className="w-6 h-6" />
      {count !== undefined && count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};