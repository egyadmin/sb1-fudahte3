import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Users, Plus, Star } from 'lucide-react';
import { useSuppliers } from '../../../../hooks/useSuppliers';
import { SupplierCard } from './SupplierCard';

interface SupplierListProps {
  onAddSupplier: () => void;
}

export const SupplierList: React.FC<SupplierListProps> = ({ onAddSupplier }) => {
  const { language } = useLanguage();
  const { suppliers } = useSuppliers();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-semibold">
            {isRTL ? 'قائمة الموردين' : 'Supplier List'}
          </h2>
        </div>
        <button
          onClick={onAddSupplier}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة مورد' : 'Add Supplier'}
        </button>
      </div>

      {/* Supplier Categories */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { nameEn: 'Technology', nameAr: 'التكنولوجيا', count: 12 },
          { nameEn: 'Equipment', nameAr: 'المعدات', count: 8 },
          { nameEn: 'Services', nameAr: 'الخدمات', count: 15 },
          { nameEn: 'Materials', nameAr: 'المواد', count: 10 }
        ].map((category, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900">
              {isRTL ? category.nameAr : category.nameEn}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {category.count} {isRTL ? 'مورد' : 'suppliers'}
            </p>
          </div>
        ))}
      </div>

      {/* Supplier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} {...supplier} />
        ))}
      </div>

      {/* Performance Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">
            {isRTL ? 'ملخص أداء الموردين' : 'Supplier Performance Summary'}
          </h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">4.6/5</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-600">
              {isRTL ? 'معدل الالتزام بالمواعيد' : 'On-time Delivery Rate'}
            </div>
            <div className="text-lg font-semibold text-green-600">95%</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {isRTL ? 'معدل جودة المنتجات' : 'Quality Rate'}
            </div>
            <div className="text-lg font-semibold text-blue-600">92%</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">
              {isRTL ? 'معدل الاستجابة' : 'Response Rate'}
            </div>
            <div className="text-lg font-semibold text-indigo-600">98%</div>
          </div>
        </div>
      </div>
    </div>
  );
};