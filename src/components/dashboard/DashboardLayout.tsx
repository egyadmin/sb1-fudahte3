import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { SectionHeader } from '../navigation/SectionHeader';
import { DashboardContent } from './DashboardContent';
import { Building2, BarChart2, Users, Target } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const quickStats = [
    {
      icon: Users,
      titleEn: 'Total Employees',
      titleAr: 'إجمالي الموظفين',
      value: '1,234',
      trend: '+12%',
      color: 'bg-blue-500'
    },
    {
      icon: BarChart2,
      titleEn: 'Performance Rate',
      titleAr: 'معدل الأداء',
      value: '92%',
      trend: '+5%',
      color: 'bg-green-500'
    },
    {
      icon: Target,
      titleEn: 'Goals Achieved',
      titleAr: 'الأهداف المحققة',
      value: '85%',
      trend: '+8%',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'} min-h-screen bg-gray-50`}>
      <div className="relative">
        {/* Banner Section */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-indigo-600 to-indigo-800 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=80"
            alt="Operations Management"
            className="w-full h-full object-cover mix-blend-overlay opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/50" />
        </div>
        
        {/* Content */}
        <div className="relative pt-6 px-6 pb-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-500 text-sm font-semibold">{stat.trend}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-700">
                    {isRTL ? stat.titleAr : stat.titleEn}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <SectionHeader />
            <DashboardContent />
          </div>
        </div>
      </div>
    </div>
  );
};