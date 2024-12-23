import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Plus } from 'lucide-react';
import { MetricsInput } from './MetricsInput';
import { ResourceInput } from './ResourceInput';
import { QualityInput } from './QualityInput';
import { ImprovementInput } from './ImprovementInput';
import { useStrategicData } from '../../../../hooks/useStrategicData';

export const DataInputForm: React.FC = () => {
  const { language } = useLanguage();
  const {
    addMetric,
    addResource,
    addQualityData,
    addImprovement,
    loading,
    error
  } = useStrategicData();
  const isRTL = language === 'ar';

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-600 text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {isRTL ? 'إدخال البيانات الاستراتيجية' : 'Strategic Data Input'}
        </h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          {isRTL ? 'إضافة جديد' : 'Add New'}
        </button>
      </div>
      
      <div className="space-y-8">
        <MetricsInput onSubmit={addMetric} />
        <ResourceInput onSubmit={addResource} />
        <QualityInput onSubmit={addQualityData} />
        <ImprovementInput onSubmit={addImprovement} />
      </div>
    </div>
  );
};