import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Truck, Plus, Package, ArrowRight } from 'lucide-react';

interface SupplyChainStatusProps {
  onAddSupply: () => void;
}

export const SupplyChainStatus: React.FC<SupplyChainStatusProps> = ({ onAddSupply }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // Mock supply chain data
  const supplyChain = [
    {
      id: '1',
      titleEn: 'Construction Materials',
      titleAr: 'مواد البناء',
      statusEn: 'In Transit',
      statusAr: 'قيد النقل',
      eta: '2024-03-20',
      progress: 65,
      supplier: {
        nameEn: 'Global Materials Co.',
        nameAr: 'شركة المواد العالمية'
      }
    },
    {
      id: '2',
      titleEn: 'Heavy Equipment',
      titleAr: 'المعدات الثقيلة',
      statusEn: 'Processing',
      statusAr: 'قيد المعالجة',
      eta: '2024-03-25',
      progress: 35,
      supplier: {
        nameEn: 'Industrial Solutions Ltd.',
        nameAr: 'الحلول الصناعية المحدودة'
      }
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Truck className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'حالة سلسلة التوريد' : 'Supply Chain Status'}
          </h3>
        </div>
        <button
          onClick={onAddSupply}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة توريد' : 'Add Supply'}
        </button>
      </div>

      {/* Supply Chain Flow */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
        <div className="relative flex justify-between">
          {['Order', 'Processing', 'Transit', 'Delivery'].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center relative z-10">
                {index + 1}
              </div>
              <span className="text-sm mt-2">
                {isRTL ? 
                  ['الطلب', 'المعالجة', 'النقل', 'التسليم'][index] : 
                  step
                }
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Supply Chain Items */}
      <div className="space-y-4">
        {supplyChain.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900">
                  {isRTL ? item.titleAr : item.titleEn}
                </h4>
                <p className="text-sm text-gray-500">
                  {isRTL ? item.supplier.nameAr : item.supplier.nameEn}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                item.statusEn === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                item.statusEn === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {isRTL ? item.statusAr : item.statusEn}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  {isRTL ? 'التقدم' : 'Progress'}
                </span>
                <span>{item.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Package className="w-4 h-4 mr-1" />
                <span>ETA: {new Date(item.eta).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
              </div>
              <button className="flex items-center text-indigo-600 hover:text-indigo-700">
                <span>{isRTL ? 'عرض التفاصيل' : 'View Details'}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-1' : 'ml-1'}`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">
            {isRTL ? 'معدل التسليم في الوقت المحدد' : 'On-time Delivery Rate'}
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">95%</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">
            {isRTL ? 'متوسط وقت التسليم' : 'Average Lead Time'}
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">12 {isRTL ? 'يوم' : 'days'}</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-purple-600">
            {isRTL ? 'معدل اكتمال الطلبات' : 'Order Fulfillment Rate'}
          </div>
          <div className="text-2xl font-bold text-purple-700 mt-1">98%</div>
        </div>
      </div>
    </div>
  );
};