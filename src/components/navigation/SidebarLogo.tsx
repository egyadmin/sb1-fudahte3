import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Building2 } from 'lucide-react';

export const SidebarLogo = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 p-6">
      <div className="flex flex-col items-center text-center">
        {/* Logo Icon */}
        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <Building2 className="w-10 h-10 text-white" />
        </div>

        {/* Primary Title */}
        <div className="mt-4 space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            {isRTL ? 'مركز العمليات' : 'Operations Hub'}
          </h1>
          <div className="h-0.5 w-16 mx-auto bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-50" />
          <p className="text-sm text-indigo-200 font-medium">
            {isRTL ? 'لوحة الإدارة' : 'Management Dashboard'}
          </p>
        </div>

        {/* Welcome Badge */}
        <div className="mt-4 px-4 py-2 bg-indigo-800/50 backdrop-blur-sm rounded-lg border border-indigo-700/50">
          <p className="text-xs text-indigo-200">
            {isRTL ? 'مرحباً بعودتك!' : 'Welcome back!'}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/20" />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      </div>
    </div>
  );
};