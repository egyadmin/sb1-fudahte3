import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, type, visible }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  if (!visible) return null;

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  };

  const colors = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };

  const Icon = icons[type];

  return (
    <div className={`fixed bottom-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
      <div className={`flex items-center p-4 rounded-lg shadow-lg ${colors[type]}`}>
        <Icon className="w-5 h-5 mr-2" />
        <span>{message}</span>
      </div>
    </div>
  );
};