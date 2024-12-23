import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { Users } from 'lucide-react';
import { TeamMemberCard } from './TeamMemberCard';

export const TeamPerformance = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const teamMembers = [
    {
      nameEn: 'Sarah Johnson',
      nameAr: 'سارة جونسون',
      roleEn: 'Senior Developer',
      roleAr: 'مطور أول',
      score: 95,
      trend: '+8%',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    {
      nameEn: 'Ahmed Hassan',
      nameAr: 'أحمد حسن',
      roleEn: 'Product Manager',
      roleAr: 'مدير المنتج',
      score: 92,
      trend: '+5%',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'أداء الفريق' : 'Team Performance'}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} {...member} />
        ))}
      </div>
    </div>
  );