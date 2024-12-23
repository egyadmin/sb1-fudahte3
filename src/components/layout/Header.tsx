import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageToggle } from '../common/LanguageToggle';
import { NotificationsPopover } from '../common/NotificationsPopover';
import { SettingsPopover } from '../common/SettingsPopover';
import { ApprovalsPopover } from '../common/approvals/ApprovalsPopover';
import { Building2, Search, Menu, X, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const { language } = useLanguage();
  const { signOut } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isRTL = language === 'ar';

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header 
      className={`fixed top-0 h-16 bg-white shadow-sm z-40 transition-all duration-200
        ${isRTL ? 'right-0 lg:right-64' : 'left-0 lg:left-64'} 
        w-full lg:w-[calc(100%-16rem)]`}
    >
      <div className="h-full px-4 lg:px-6 flex items-center justify-between bg-gradient-to-r from-primary-600 to-primary-800">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
        >
          {showMobileMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Logo & Title */}
        <div className="flex items-center">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className={`${isRTL ? 'mr-4' : 'ml-4'} hidden sm:block`}>
            <h2 className="text-xl lg:text-2xl font-bold text-white tracking-wide">
              {language === 'en' ? 'Operations Management' : 'نظام إدارة العمليات'}
            </h2>
            <p className="text-sm text-primary-200">
              {language === 'en' ? 'Enterprise Dashboard' : 'لوحة المؤسسة'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search - Hidden on Mobile */}
          <div className="hidden lg:relative lg:block">
            <input
              type="text"
              placeholder={isRTL ? 'بحث...' : 'Search...'}
              className="w-64 px-4 py-2 pl-10 bg-primary-700/50 text-white placeholder-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-300 w-5 h-5" />
          </div>

          {/* Mobile-optimized Action Buttons */}
          <div className="flex items-center space-x-1 lg:space-x-2">
            <ApprovalsPopover />
            <NotificationsPopover />
            <SettingsPopover />
            
            {/* Language Toggle - Always Visible */}
            <LanguageToggle />

            {/* Sign Out - Hidden on Mobile */}
            <button
              onClick={handleSignOut}
              className="hidden lg:flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span>{isRTL ? 'تسجيل الخروج' : 'Sign Out'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden fixed inset-0 top-16 bg-primary-900/95 backdrop-blur-sm z-30">
            <div className="p-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={isRTL ? 'بحث...' : 'Search...'}
                  className="w-full px-4 py-2 pl-10 bg-primary-700/50 text-white placeholder-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-300 w-5 h-5" />
              </div>

              {/* Mobile Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center px-4 py-3 text-white bg-primary-700/50 rounded-lg"
              >
                <LogOut className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{isRTL ? 'تسجيل الخروج' : 'Sign Out'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};