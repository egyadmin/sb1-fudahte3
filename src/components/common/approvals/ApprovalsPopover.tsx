import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ApprovalButton } from './ApprovalButton';
import { ApprovalsList } from './ApprovalsList';
import { useApprovals } from '../../../hooks/useApprovals';

export const ApprovalsPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const { loading } = useApprovals();
  const isRTL = language === 'ar';

  return (
    <div className="relative">
      <ApprovalButton 
        onClick={() => setIsOpen(!isOpen)} 
        count={3} // This will be dynamic based on pending approvals
      />

      {isOpen && (
        <div className={`absolute top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 ${
          isRTL ? 'left-0' : 'right-0'
        }`}>
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {isRTL ? 'الموافقات المعلقة' : 'Pending Approvals'}
            </h3>
          </div>

          <ApprovalsList />
        </div>
      )}
    </div>
  );
};