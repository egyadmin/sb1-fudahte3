import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Truck, Save } from 'lucide-react';

interface SupplyChainFormProps {
  onClose: () => void;
}

export const SupplyChainForm: React.FC<SupplyChainFormProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    supplierId: '',
    quantity: '',
    expectedDate: '',
    statusEn: 'pending',
    statusAr: 'قيد الانتظار',
    notesEn: '',
    notesAr: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Supply chain entry creation logic will be implemented here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Truck className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة عملية توريد جديدة' : 'Add New Supply Chain Entry'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
          </label>
          <input
            type="text"
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان (بالعربية)' : 'Title (Arabic)'}
          </label>
          <input
            type="text"
            value={formData.titleAr}
            onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المورد' : 'Supplier'}
          </label>
          <select
            value={formData.supplierId}
            onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">{isRTL ? 'اختر المورد' : 'Select Supplier'}</option>
            {/* Supplier options will be populated here */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الكمية' : 'Quantity'}
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'التاريخ المتوقع' : 'Expected Date'}
          </label>
          <input
            type="date"
            value={formData.expectedDate}
            onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الحالة' : 'Status'}
          </label>
          <select
            value={formData.statusEn}
            onChange={(e) => {
              const statusAr = e.target.value === 'pending' ? 'قيد الانتظار' :
                             e.target.value === 'in_transit' ? 'قيد النقل' :
                             e.target.value === 'delivered' ? 'تم التسليم' : '';
              setFormData({ ...formData, statusEn: e.target.value, statusAr });
            }}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="pending">{isRTL ? 'قيد الانتظار' : 'Pending'}</option>
            <option value="in_transit">{isRTL ? 'قيد النقل' : 'In Transit'}</option>
            <option value="delivered">{isRTL ? 'تم التسليم' : 'Delivered'}</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'ملاحظات (بالإنجليزية)' : 'Notes (English)'}
          </label>
          <textarea
            value={formData.notesEn}
            onChange={(e) => setFormData({ ...formData, notesEn: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'ملاحظات (بالعربية)' : 'Notes (Arabic)'}
          </label>
          <textarea
            value={formData.notesAr}
            onChange={(e) => setFormData({ ...formData, notesAr: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          {isRTL ? 'إلغاء' : 'Cancel'}
        </button>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'حفظ' : 'Save'}
        </button>
      </div>
    </form>
  );
};