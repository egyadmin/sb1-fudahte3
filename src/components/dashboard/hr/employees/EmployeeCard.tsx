import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Mail, Phone, Building2, ExternalLink } from 'lucide-react';
import { Employee } from '../../../../types/hr';

export const EmployeeCard: React.FC<Employee> = ({
  nameEn,
  nameAr,
  positionEn,
  positionAr,
  departmentEn,
  departmentAr,
  email,
  phone,
  imageUrl
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-all duration-200 group">
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl}
          alt={isRTL ? nameAr : nameEn}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-indigo-200"
        />
        <div>
          <h4 className="font-medium text-lg group-hover:text-indigo-600 transition-colors">
            {isRTL ? nameAr : nameEn}
          </h4>
          <p className="text-gray-600">{isRTL ? positionAr : positionEn}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Building2 className="w-4 h-4 mr-1" />
            <span>{isRTL ? departmentAr : departmentEn}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2 text-sm">
        <a 
          href={`mailto:${email}`} 
          className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <Mail className="w-4 h-4 mr-2" />
          <span>{email}</span>
          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <a 
          href={`tel:${phone}`} 
          className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <Phone className="w-4 h-4 mr-2" />
          <span>{phone}</span>
          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
};