import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useHR } from '../../../../hooks/useHR';
import { UserPlus } from 'lucide-react';

export const EmployeeForm: React.FC = () => {
  const { language } = useLanguage();
  const { addEmployee, departments, positions } = useHR();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    email: '',
    phone: '',
    positionId: '',
    departmentId: '',
    hireDate: '',
    imageUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEmployee(formData);
    setFormData({
      nameEn: '',
      nameAr: '',
      email: '',
      phone: '',
      positionId: '',
      departmentId: '',
      hireDate: '',
      imageUrl: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <UserPlus className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'إضافة موظف جديد' : 'Add New Employee'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.nameEn}
          onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
          placeholder={isRTL ? 'الاسم (بالإنجليزية)' : 'Name (English)'}
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          value={formData.nameAr}
          onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
          placeholder={isRTL ? 'الاسم (بالعربية)' : 'Name (Arabic)'}
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={isRTL ? 'البريد الإلكتروني' : 'Email'}
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder={isRTL ? 'رقم الهاتف' : 'Phone'}
          className="p-2 border rounded-lg"
        />
        <select
          value={formData.departmentId}
          onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
          className="p-2 border rounded-lg"
          required
        >
          <option value="">{isRTL ? 'اختر القسم' : 'Select Department'}</option>
          {departments.map((dept: any) => (
            <option key={dept.id} value={dept.id}>
              {isRTL ? dept.name_ar : dept.name_en}
            </option>
          ))}
        </select>
        <select
          value={formData.positionId}
          onChange={(e) => setFormData({ ...formData, positionId: e.target.value })}
          className="p-2 border rounded-lg"
          required
        >
          <option value="">{isRTL ? 'اختر المنصب' : 'Select Position'}</option>
          {positions.map((pos: any) => (
            <option key={pos.id} value={pos.id}>
              {isRTL ? pos.title_ar : pos.title_en}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={formData.hireDate}
          onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder={isRTL ? 'رابط الصورة' : 'Image URL'}
          className="p-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {isRTL ? 'إضافة موظف' : 'Add Employee'}
      </button>
    </form>
  );
};