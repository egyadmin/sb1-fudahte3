import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Target, Plus, X } from 'lucide-react';
import { ProjectPlanningForm } from './sections/ProjectPlanningForm';
import { ResourceAllocationForm } from './sections/ResourceAllocationForm';
import { TimelineForm } from './sections/TimelineForm';
import { OperationsForm } from './sections/OperationsForm';
import { MonitoringForm } from './sections/MonitoringForm';
import { useStrategicData } from '../../../../hooks/useStrategicData';
import { useToast } from '../../../../hooks/useToast';

export const StrategicForm = () => {
  const { language } = useLanguage();
  const { addMetric, addResource, addQualityData, addImprovement, loading } = useStrategicData();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('project');
  const isRTL = language === 'ar';

  const sections = [
    { id: 'project', titleEn: 'Project Planning', titleAr: 'تخطيط المشروع' },
    { id: 'operations', titleEn: 'Site Operations', titleAr: 'العمليات التنفيذية بالمواقع' },
    { id: 'monitoring', titleEn: 'Monitoring & Control', titleAr: 'الرقابة والتحسين' }
  ];

  const handleSubmit = async (data: any, type: string) => {
    try {
      switch (type) {
        case 'metric':
          await addMetric(data);
          break;
        case 'resource':
          await addResource(data);
          break;
        case 'quality':
          await addQualityData(data);
          break;
        case 'improvement':
          await addImprovement(data);
          break;
      }
      showToast(
        isRTL ? 'تم حفظ البيانات بنجاح' : 'Data saved successfully',
        'success'
      );
      setIsOpen(false);
    } catch (error) {
      showToast(
        isRTL ? 'حدث خطأ أثناء حفظ البيانات' : 'Error saving data',
        'error'
      );
    }
  };

  const renderForm = () => {
    switch (activeSection) {
      case 'project':
        return (
          <>
            <ProjectPlanningForm onSubmit={(data) => handleSubmit(data, 'metric')} />
            <ResourceAllocationForm onSubmit={(data) => handleSubmit(data, 'resource')} />
            <TimelineForm onSubmit={(data) => handleSubmit(data, 'metric')} />
          </>
        );
      case 'operations':
        return <OperationsForm onSubmit={(data) => handleSubmit(data, 'quality')} />;
      case 'monitoring':
        return <MonitoringForm onSubmit={(data) => handleSubmit(data, 'improvement')} />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة بيانات استراتيجية جديدة' : 'Add New Strategic Data'}
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Target className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <h2 className="text-xl font-bold text-gray-900">
                {isRTL ? 'إدخال البيانات الاستراتيجية' : 'Strategic Data Input'}
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8" aria-label="Tabs">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`${
                      activeSection === section.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {isRTL ? section.titleAr : section.titleEn}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="space-y-6">
            {renderForm()}
          </div>
        </div>
      )}
    </div>
  );
};