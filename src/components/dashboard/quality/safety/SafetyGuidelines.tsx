import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Shield, Plus, AlertTriangle } from 'lucide-react';
import { useSafetyGuidelines } from '../../../../hooks/useSafetyGuidelines';

interface SafetyGuidelinesProps {
  onAddGuideline: () => void;
  onAddProtocol: () => void;
}

export const SafetyGuidelines: React.FC<SafetyGuidelinesProps> = ({ 
  onAddGuideline,
  onAddProtocol
}) => {
  const { language } = useLanguage();
  const { guidelines } = useSafetyGuidelines();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Shield className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إرشادات السلامة' : 'Safety Guidelines'}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onAddGuideline}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'إضافة إرشادات' : 'Add Guideline'}
          </button>
          <button
            onClick={onAddProtocol}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'إضافة بروتوكول' : 'Add Protocol'}
          </button>
        </div>
      </div>

      {/* Safety Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'معدل الامتثال للسلامة' : 'Safety Compliance Rate'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">95%</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">
            {isRTL ? 'إرشادات نشطة' : 'Active Guidelines'}
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">18</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-sm text-yellow-600">
            {isRTL ? 'تحديثات مطلوبة' : 'Updates Required'}
          </div>
          <div className="text-2xl font-bold text-yellow-700 mt-1">3</div>
        </div>
      </div>

      {/* Emergency Protocols */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className={`w-4 h-4 text-red-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h4 className="font-medium text-gray-900">
            {isRTL ? 'بروتوكولات الطوارئ' : 'Emergency Protocols'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { titleEn: 'Fire Emergency', titleAr: 'حالات الحريق', status: 'active' },
            { titleEn: 'Medical Emergency', titleAr: 'الطوارئ الطبية', status: 'active' },
            { titleEn: 'Evacuation Plan', titleAr: 'خطة الإخلاء', status: 'review' },
            { titleEn: 'Equipment Failure', titleAr: 'تعطل المعدات', status: 'active' }
          ].map((protocol, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-gray-900">
                  {isRTL ? protocol.titleAr : protocol.titleEn}
                </h5>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  protocol.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {protocol.status === 'active' 
                    ? (isRTL ? 'نشط' : 'Active')
                    : (isRTL ? 'قيد المراجعة' : 'Under Review')
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines List */}
      <div className="space-y-4">
        {guidelines.map((guideline, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">
                  {isRTL ? guideline.titleAr : guideline.titleEn}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {isRTL ? guideline.descriptionAr : guideline.descriptionEn}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                guideline.priority === 'high' ? 'bg-red-100 text-red-800' :
                guideline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {guideline.priority === 'high' ? (isRTL ? 'عالي' : 'High') :
                 guideline.priority === 'medium' ? (isRTL ? 'متوسط' : 'Medium') :
                 (isRTL ? 'منخفض' : 'Low')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};