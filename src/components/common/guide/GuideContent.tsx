import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { X, Building2, Target, Activity } from 'lucide-react';
import { GuideSection } from './GuideSection';
import { GuideTips } from './GuideTips';

interface GuideContentProps {
  onClose: () => void;
}

export const GuideContent: React.FC<GuideContentProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {isRTL ? 'مخطط تدفق لإدارة العمليات' : 'Operations Management Flow'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <GuideSection
            icon={Building2}
            titleEn="Strategic Planning at Headquarters"
            titleAr="التخطيط الاستراتيجي بالمركز الرئيسي"
            steps={[
              { en: 'Project Objectives', ar: 'أهداف المشروع' },
              { en: 'Project Planning', ar: 'إعداد خطة المشروع' },
              { en: 'Resource Allocation', ar: 'تخصيص الموارد (مالية/بشرية)' },
              { en: 'Timeline Scheduling', ar: 'تحديد الجداول الزمنية' }
            ]}
            imageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c"
          />

          <GuideSection
            icon={Target}
            titleEn="Site Operations Execution"
            titleAr="العمليات التنفيذية بالمواقع"
            steps={[
              { en: 'Resource Deployment', ar: 'إرسال الموارد (بشرية ومادية)' },
              { en: 'Quality Monitoring', ar: 'متابعة جودة العمل' },
              { en: 'Progress Reports Review', ar: 'مراجعة التقارير الدورية' }
            ]}
            imageUrl="https://images.unsplash.com/photo-1581094794329-c8112a89af12"
          />

          <GuideSection
            icon={Activity}
            titleEn="Monitoring and Improvement"
            titleAr="الرقابة والتحسين"
            steps={[
              { en: 'Site Reports', ar: 'تقارير من المواقع' },
              { en: 'Performance Review', ar: 'مراجعة الأداء في المركز الرئيسي' },
              { en: 'Improvement Decisions', ar: 'اتخاذ قرارات للتحسين أو التدخل' }
            ]}
            imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
          />

          <GuideTips />
        </div>
      </div>
    </div>
  );
};