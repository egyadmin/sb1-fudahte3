import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Building2, Target, Users, Calendar, BarChart2, Activity } from 'lucide-react';

interface StrategicPrintPreviewProps {
  data: {
    objectives: any[];
    planning: any[];
    resources: any[];
    timeline: any[];
    operations: any[];
    monitoring: any[];
  };
}

export const StrategicPrintPreview: React.FC<StrategicPrintPreviewProps> = ({ data }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="print-content space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Project Objectives */}
      <section className="print-section print-avoid-break">
        <div className="flex items-center mb-4">
          <Target className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-bold">{isRTL ? 'أهداف المشروع' : 'Project Objectives'}</h2>
        </div>
        <div className="print-table-wrapper">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border text-start">{isRTL ? 'الهدف' : 'Objective'}</th>
                <th className="p-2 border text-start">{isRTL ? 'الوصف' : 'Description'}</th>
                <th className="p-2 border text-start">{isRTL ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {data.objectives.map((obj, index) => (
                <tr key={index}>
                  <td className="p-2 border">{isRTL ? obj.titleAr : obj.titleEn}</td>
                  <td className="p-2 border">{isRTL ? obj.descriptionAr : obj.descriptionEn}</td>
                  <td className="p-2 border">{isRTL ? obj.statusAr : obj.statusEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Project Planning */}
      <section className="print-section print-avoid-break">
        <div className="flex items-center mb-4">
          <BarChart2 className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-bold">{isRTL ? 'خطة المشروع' : 'Project Planning'}</h2>
        </div>
        <div className="print-table-wrapper">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border text-start">{isRTL ? 'المرحلة' : 'Phase'}</th>
                <th className="p-2 border text-start">{isRTL ? 'الخطوات التالية' : 'Next Steps'}</th>
                <th className="p-2 border text-start">{isRTL ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {data.planning.map((plan, index) => (
                <tr key={index}>
                  <td className="p-2 border">{isRTL ? plan.phaseAr : plan.phaseEn}</td>
                  <td className="p-2 border">{isRTL ? plan.nextStepAr : plan.nextStepEn}</td>
                  <td className="p-2 border">{isRTL ? plan.statusAr : plan.statusEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Resource Allocation */}
      <section className="print-section print-avoid-break">
        <div className="flex items-center mb-4">
          <Users className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-bold">{isRTL ? 'تخصيص الموارد' : 'Resource Allocation'}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 print-table-wrapper">
          <div>
            <h3 className="text-lg font-semibold mb-2">{isRTL ? 'الموارد المالية' : 'Financial Resources'}</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 border text-start">{isRTL ? 'الفئة' : 'Category'}</th>
                  <th className="p-2 border text-start">{isRTL ? 'المبلغ' : 'Amount'}</th>
                </tr>
              </thead>
              <tbody>
                {data.resources.financial.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{isRTL ? item.categoryAr : item.categoryEn}</td>
                    <td className="p-2 border">${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{isRTL ? 'الموارد البشرية' : 'Human Resources'}</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 border text-start">{isRTL ? 'الدور' : 'Role'}</th>
                  <th className="p-2 border text-start">{isRTL ? 'العدد' : 'Count'}</th>
                </tr>
              </thead>
              <tbody>
                {data.resources.human.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{isRTL ? item.roleAr : item.roleEn}</td>
                    <td className="p-2 border">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="print-section print-avoid-break">
        <div className="flex items-center mb-4">
          <Calendar className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-bold">{isRTL ? 'الجدول الزمني' : 'Timeline'}</h2>
        </div>
        <div className="print-table-wrapper">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border text-start">{isRTL ? 'المرحلة' : 'Phase'}</th>
                <th className="p-2 border text-start">{isRTL ? 'المدة' : 'Duration'}</th>
                <th className="p-2 border text-start">{isRTL ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {data.timeline.map((phase, index) => (
                <tr key={index}>
                  <td className="p-2 border">{isRTL ? phase.titleAr : phase.titleEn}</td>
                  <td className="p-2 border">{isRTL ? phase.durationAr : phase.durationEn}</td>
                  <td className="p-2 border">{isRTL ? phase.statusAr : phase.statusEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Site Operations */}
      <section className="print-section print-avoid-break">
        <div className="flex items-center mb-4">
          <Activity className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-bold">{isRTL ? 'العمليات التنفيذية بالمواقع' : 'Site Operations'}</h2>
        </div>
        <div className="print-table-wrapper">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border text-start">{isRTL ? 'العملية' : 'Operation'}</th>
                <th className="p-2 border text-start">{isRTL ? 'الموقع' : 'Site'}</th>
                <th className="p-2 border text-start">{isRTL ? 'التقدم' : 'Progress'}</th>
                <th className="p-2 border text-start">{isRTL ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {data.operations.map((op, index) => (
                <tr key={index}>
                  <td className="p-2 border">{isRTL ? op.titleAr : op.titleEn}</td>
                  <td className="p-2 border">{isRTL ? op.siteAr : op.siteEn}</td>
                  <td className="p-2 border">{op.progress}%</td>
                  <td className="p-2 border">{isRTL ? op.statusAr : op.statusEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Monitoring and Control */}
      <section className="print-section print-avoid-break">
        <div className="flex items-center mb-4">
          <Activity className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-bold">{isRTL ? 'الرقابة والتحسين' : 'Monitoring & Control'}</h2>
        </div>
        <div className="print-table-wrapper">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border text-start">{isRTL ? 'المؤشر' : 'Metric'}</th>
                <th className="p-2 border text-start">{isRTL ? 'القيمة' : 'Value'}</th>
                <th className="p-2 border text-start">{isRTL ? 'الاتجاه' : 'Trend'}</th>
                <th className="p-2 border text-start">{isRTL ? 'التوصيات' : 'Recommendations'}</th>
              </tr>
            </thead>
            <tbody>
              {data.monitoring.map((metric, index) => (
                <tr key={index}>
                  <td className="p-2 border">{isRTL ? metric.titleAr : metric.titleEn}</td>
                  <td className="p-2 border">{metric.value}</td>
                  <td className="p-2 border">{metric.trend}</td>
                  <td className="p-2 border">{isRTL ? metric.recommendationsAr : metric.recommendationsEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notes Section */}
      <section className="print-section print-avoid-break">
        <div className="border-t-2 border-gray-200 pt-4 mt-8">
          <h3 className="text-lg font-semibold mb-4">
            {isRTL ? 'ملاحظات وتوصيات' : 'Notes & Recommendations'}
          </h3>
          <div className="min-h-[100px] border border-gray-300 rounded-lg p-4"></div>
        </div>
      </section>
    </div>
  );
};