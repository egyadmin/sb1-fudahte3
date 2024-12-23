import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Building2, Phone, Mail, Award } from 'lucide-react';

interface SupplierCardProps {
  id: string;
  nameEn: string;
  nameAr: string;
  categoryEn: string;
  categoryAr: string;
  rating: number;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'inactive';
}

export const SupplierCard: React.FC<SupplierCardProps> = ({
  nameEn,
  nameAr,
  categoryEn,
  categoryAr,
  rating,
  email,
  phone,
  status
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg">{isRTL ? nameAr : nameEn}</h3>
          <p className="text-gray-600">{isRTL ? categoryAr : categoryEn}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="flex items-center mb-3">
        <Award className="w-4 h-4 text-yellow-500" />
        <span className="ml-1 text-sm text-gray-600">Rating: {rating}/5</span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          <span>{email}</span>
        </div>
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-2" />
          <span>{phone}</span>
        </div>
      </div>
    </div>
  );
};