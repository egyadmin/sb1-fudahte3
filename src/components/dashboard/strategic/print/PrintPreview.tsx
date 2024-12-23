import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useProjectObjectives } from '../../../../hooks/useProjectObjectives';
import { useProjectPlans } from '../../../../hooks/useProjectPlans';
import { useResourceAllocation } from '../../../../hooks/useResourceAllocation';
import { useProjectTimeline } from '../../../../hooks/useProjectTimeline';
import { PrintPreviewHeader } from './PrintPreviewHeader';
import { PrintPreviewContent } from './PrintPreviewContent';
import { PrintPreviewTable } from './PrintPreviewTable';
import { PrintPreviewMetrics } from './PrintPreviewMetrics';
import { PrintPreviewSignatures } from './PrintPreviewSignatures';
import { PrintStyles } from './PrintStyles';

interface PrintPreviewProps {
  onClose: () => void;
  onPrint: () => void;
}

export const PrintPreview: React.FC<PrintPreviewProps> = ({
  onClose,
  onPrint
}) => {
  const { language } = useLanguage();
  const { objectives } = useProjectObjectives();
  const { plans } = useProjectPlans();
  const { resources } = useResourceAllocation();
  const { timeline } = useProjectTimeline();
  const isRTL = language === 'ar';

  // Transform data for printing
  const printData = {
    objectives: objectives.map(obj => ({
      title: isRTL ? obj.titleAr : obj.titleEn,
      description: isRTL ? obj.descriptionAr : obj.descriptionEn,
      status: isRTL ? obj.statusAr : obj.statusEn
    })),
    planning: plans.map(plan => ({
      phase: isRTL ? plan.phaseAr : plan.phaseEn,
      nextStep: isRTL ? plan.nextStepAr : plan.nextStepEn,
      status: isRTL ? plan.statusAr : plan.statusEn
    })),
    resources: {
      financial: resources.financial.map(item => ({
        category: isRTL ? item.categoryAr : item.categoryEn,
        amount: new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
          style: 'currency',
          currency: 'SAR'
        }).format(item.amount)
      })),
      human: resources.human.map(item => ({
        role: isRTL ? item.roleAr : item.roleEn,
        count: item.count,
        utilization: `${item.utilization}%`
      }))
    },
    timeline: timeline.map(phase => ({
      phase: isRTL ? phase.titleAr : phase.titleEn,
      duration: isRTL ? phase.durationAr : phase.durationEn,
      status: isRTL ? phase.statusAr : phase.statusEn
    }))
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <PrintStyles />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <PrintPreviewHeader onClose={onClose} onPrint={onPrint} />
        
        <div className="flex-1 overflow-auto p-8 bg-gray-100">
          <div className="bg-white shadow-md mx-auto max-w-[21cm] min-h-[29.7cm] p-[1.5cm] print:p-0 print:shadow-none">
            <PrintPreviewContent>
              {/* Project Objectives */}
              <PrintPreviewTable
                title={isRTL ? 'أهداف المشروع' : 'Project Objectives'}
                columns={[
                  { key: 'title', titleEn: 'Objective', titleAr: 'الهدف', width: '30%' },
                  { key: 'description', titleEn: 'Description', titleAr: 'الوصف', width: '50%' },
                  { key: 'status', titleEn: 'Status', titleAr: 'الحالة', width: '20%' }
                ]}
                data={printData.objectives}
              />

              {/* Project Planning */}
              <PrintPreviewTable
                title={isRTL ? 'خطة المشروع' : 'Project Planning'}
                columns={[
                  { key: 'phase', titleEn: 'Phase', titleAr: 'المرحلة', width: '30%' },
                  { key: 'nextStep', titleEn: 'Next Steps', titleAr: 'الخطوات التالية', width: '50%' },
                  { key: 'status', titleEn: 'Status', titleAr: 'الحالة', width: '20%' }
                ]}
                data={printData.planning}
              />

              {/* Resource Allocation */}
              <div className="grid grid-cols-2 gap-4 print-avoid-break">
                <PrintPreviewTable
                  title={isRTL ? 'الموارد المالية' : 'Financial Resources'}
                  columns={[
                    { key: 'category', titleEn: 'Category', titleAr: 'الفئة' },
                    { key: 'amount', titleEn: 'Amount', titleAr: 'المبلغ', align: 'right' }
                  ]}
                  data={printData.resources.financial}
                />
                <PrintPreviewTable
                  title={isRTL ? 'الموارد البشرية' : 'Human Resources'}
                  columns={[
                    { key: 'role', titleEn: 'Role', titleAr: 'الدور' },
                    { key: 'count', titleEn: 'Count', titleAr: 'العدد', align: 'right' },
                    { key: 'utilization', titleEn: 'Utilization', titleAr: 'الاستخدام', align: 'right' }
                  ]}
                  data={printData.resources.human}
                />
              </div>

              {/* Timeline */}
              <PrintPreviewTable
                title={isRTL ? 'الجدول الزمني' : 'Timeline'}
                columns={[
                  { key: 'phase', titleEn: 'Phase', titleAr: 'المرحلة', width: '40%' },
                  { key: 'duration', titleEn: 'Duration', titleAr: 'المدة', width: '40%' },
                  { key: 'status', titleEn: 'Status', titleAr: 'الحالة', width: '20%' }
                ]}
                data={printData.timeline}
              />

              <PrintPreviewSignatures />
            </PrintPreviewContent>
          </div>
        </div>
      </div>
    </div>
  );
};