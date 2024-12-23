import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Cpu, Plus, TrendingUp } from 'lucide-react';
import { useTransformationMilestones } from '../../../../hooks/useTransformationMilestones';

interface DigitalTransformationProps {
  onAddInitiative: () => void;
}

export const DigitalTransformation: React.FC<DigitalTransformationProps> = ({ onAddInitiative }) => {
  const { language } = useLanguage();
  const { milestones } = useTransformationMilestones();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Cpu className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'التحول الرقمي' : 'Digital Transformation'}
          </h3>
        </div>
        <button
          onClick={onAddInitiative}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة مبادرة' : 'Add Initiative'}
        </button>
      </div>

      {/* Transformation Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">
            {isRTL ? 'التقدم العام' : 'Overall Progress'}
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">75%</div>
          <div className="flex items-center mt-1 text-sm text-blue-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+15% {isRTL ? 'من الربع الماضي' : 'from last quarter'}</span>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'المبادرات المكتملة' : 'Completed Initiatives'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">8</div>
          <div className="text-sm text-green-600 mt-1">
            {isRTL ? 'من أصل 12 مبادرة' : 'out of 12 initiatives'}
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-purple-600">
            {isRTL ? 'الوفر السنوي المتوقع' : 'Expected Annual Savings'}
          </div>
          <div className="text-2xl font-bold text-purple-700 mt-1">2.5M SAR</div>
          <div className="text-sm text-purple-600 mt-1">
            {isRTL ? 'بعد التنفيذ الكامل' : 'after full implementation'}
          </div>
        </div>
      </div>

      {/* Transformation Milestones */}
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900">
                  {isRTL ? milestone.titleAr : milestone.titleEn}
                </h4>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <span>{isRTL ? milestone.dueDateAr : milestone.dueDateEn}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                milestone.statusEn === 'On Track' ? 'bg-green-100 text-green-800' :
                milestone.statusEn === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {isRTL ? milestone.statusAr : milestone.statusEn}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  {isRTL ? 'التقدم' : 'Progress'}
                </span>
                <span>{milestone.progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${milestone.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Benefits */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-900 mb-4">
          {isRTL ? 'الفوائد الرئيسية' : 'Key Benefits'}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { titleEn: 'Operational Efficiency', titleAr: 'الكفاءة التشغيلية', value: '+35%' },
            { titleEn: 'Cost Reduction', titleAr: 'خفض التكاليف', value: '-25%' },
            { titleEn: 'Process Automation', titleAr: 'أتمتة العمليات', value: '85%' },
            { titleEn: 'Data Accuracy', titleAr: 'دقة البيانات', value: '98%' }
          ].map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-900">
                {isRTL ? benefit.titleAr : benefit.titleEn}
              </h5>
              <p className="text-lg font-bold text-indigo-600 mt-1">
                {benefit.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};