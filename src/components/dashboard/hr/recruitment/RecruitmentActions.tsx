import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Plus, Building2, Users } from 'lucide-react';
import { DepartmentForm } from '../forms/DepartmentForm';
import { PositionForm } from '../forms/PositionForm';
import { RecruitmentForm } from '../forms/RecruitmentForm';

export const RecruitmentActions = () => {
  const { language } = useLanguage();
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const isRTL = language === 'ar';

  const actions = [
    {
      id: 'department',
      titleEn: 'Add Department',
      titleAr: 'إضافة قسم',
      icon: Building2,
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    },
    {
      id: 'position',
      titleEn: 'Add Position',
      titleAr: 'إضافة منصب',
      icon: Users,
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      id: 'recruitment',
      titleEn: 'Post Job',
      titleAr: 'نشر وظيفة',
      icon: Plus,
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    }
  ];

  const renderForm = () => {
    switch (activeForm) {
      case 'department':
        return <DepartmentForm onClose={() => setActiveForm(null)} />;
      case 'position':
        return <PositionForm onClose={() => setActiveForm(null)} />;
      case 'recruitment':
        return <RecruitmentForm onClose={() => setActiveForm(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {!activeForm ? (
        <>
          <h3 className="text-lg font-semibold mb-4">
            {isRTL ? 'إجراءات التوظيف' : 'Recruitment Actions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => setActiveForm(action.id)}
                  className={`${action.color} p-4 rounded-lg transition-all duration-200
                    flex items-center justify-center space-x-2`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">
                    {isRTL ? action.titleAr : action.titleEn}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        renderForm()
      )}
    </div>
  );
};