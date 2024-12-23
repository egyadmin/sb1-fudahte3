import React from 'react';
import { useLanguage } from '../../../../../contexts/LanguageContext';
import { PipelineStages } from './PipelineStages';
import { PipelineMetrics } from './PipelineMetrics';
import { PipelineFilters } from './PipelineFilters';

export const RecruitmentPipeline = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        {isRTL ? 'خط أنابيب التوظيف' : 'Recruitment Pipeline'}
      </h3>
      <PipelineFilters />
      <PipelineMetrics />
      <PipelineStages />
    </div>
  );
};