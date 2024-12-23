import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { PolicyList } from './PolicyList';
import { PolicyForm } from '../forms/PolicyForm';
import { PolicyCategories } from './PolicyCategories';
import { PolicyStats } from './PolicyStats';

export const PolicyManagement = () => {
  const { language } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const isRTL = language === 'ar';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {showForm ? (
          <PolicyForm onClose={() => setShowForm(false)} />
        ) : (
          <PolicyList onAddNew={() => setShowForm(true)} />
        )}
      </div>
      <div className="space-y-6">
        <PolicyStats />
        <PolicyCategories />
      </div>
    </div>
  );
};