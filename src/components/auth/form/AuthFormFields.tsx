import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Mail, Lock } from 'lucide-react';

interface AuthFormFieldsProps {
  email: string;
  password: string;
  onChange: (field: 'email' | 'password', value: string) => void;
}

export const AuthFormFields: React.FC<AuthFormFieldsProps> = ({
  email,
  password,
  onChange
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isRTL ? 'البريد الإلكتروني' : 'Email'}
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            className="pl-10 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
            placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isRTL ? 'كلمة المرور' : 'Password'}
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => onChange('password', e.target.value)}
            className="pl-10 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
            placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
          />
        </div>
      </div>
    </div>
  );
};