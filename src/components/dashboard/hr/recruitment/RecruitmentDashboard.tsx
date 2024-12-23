import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { JobPostings } from './JobPostings';
import { ApplicationsOverview } from './ApplicationsOverview';
import { RecruitmentMetrics } from './RecruitmentMetrics';
import { RecruitmentActions } from './RecruitmentActions';

export const RecruitmentDashboard = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <RecruitmentActions />
        <JobPostings />
      </div>
      <div className="space-y-6">
        <RecruitmentMetrics />
        <ApplicationsOverview />
      </div>
    </div>
  );
};