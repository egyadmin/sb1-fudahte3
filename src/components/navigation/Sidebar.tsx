import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { menuItems } from '../../data/menuItems';
import { SidebarItem } from './SidebarItem';
import { SidebarLogo } from './SidebarLogo';
import { Menu, X } from 'lucide-react';

export const Sidebar = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = language === 'ar';
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed top-4 ${isRTL ? 'right-4' : 'left-4'} z-50 p-2 bg-white rounded-lg shadow-lg`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`w-64 bg-white h-screen shadow-lg fixed transition-all duration-300 z-40
          ${isRTL ? 'right-0' : 'left-0'} top-0 overflow-y-auto
          ${isOpen ? 'translate-x-0' : `${isRTL ? 'translate-x-64' : '-translate-x-64'}`}
          lg:translate-x-0`}
      >
        <SidebarLogo />
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.id} 
              item={item} 
              onClick={() => setIsOpen(false)}
            />
          ))}
        </nav>
        
        {/* Version Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white">
          <div className="flex items-center justify-center p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
            <div className="text-center">
              <div className="text-sm font-medium text-indigo-600">
                {isRTL ? 'نظام إدارة العمليات' : 'Operations Management'}
              </div>
              <div className="flex items-center justify-center mt-1">
                <div className="px-2 py-0.5 bg-indigo-100 rounded text-xs font-semibold text-indigo-700">
                  v1.0.0
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400 ml-2 animate-pulse" 
                  title={isRTL ? 'نشط' : 'Active'}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};