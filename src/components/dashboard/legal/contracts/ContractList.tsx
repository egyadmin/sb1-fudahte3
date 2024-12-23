import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Calendar, DollarSign } from 'lucide-react';
import { DocumentActions } from '../documents/DocumentActions';
import { DocumentPreview } from '../documents/DocumentPreview';

interface Contract {
  id: string;
  titleEn: string;
  titleAr: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
  documentUrl?: string;
}

interface ContractListProps {
  contracts: Contract[];
}

export const ContractList: React.FC<ContractListProps> = ({ contracts }) => {
  const { language } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isRTL = language === 'ar';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {contracts.map((contract) => (
        <div 
          key={contract.id}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary-200 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">
                {isRTL ? contract.titleAr : contract.titleEn}
              </h4>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{contract.startDate} - {contract.endDate}</span>
              </div>

              <div className="flex items-center text-sm text-primary-600 font-medium">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>{formatCurrency(contract.value)}</span>
              </div>
            </div>

            <DocumentActions
              onView={() => contract.documentUrl && setPreviewUrl(contract.documentUrl)}
              onDownload={() => contract.documentUrl && window.open(contract.documentUrl, '_blank')}
              onHistory={() => console.log('History clicked')}
              onShare={() => console.log('Share clicked')}
            />
          </div>
        </div>
      ))}

      {previewUrl && (
        <DocumentPreview
          url={previewUrl}
          title={isRTL ? 'معاينة العقد' : 'Contract Preview'}
          onClose={() => setPreviewUrl(null)}
        />
      )}
    </div>
  );
};