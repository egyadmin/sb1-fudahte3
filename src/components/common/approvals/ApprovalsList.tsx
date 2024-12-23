import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ApprovalCard } from './ApprovalCard';
import { useApprovals } from '../../../hooks/useApprovals';

export const ApprovalsList = () => {
  const { language } = useLanguage();
  const { loading, updateStatus } = useApprovals();
  const isRTL = language === 'ar';

  // Mock data - replace with actual data from useApprovals
  const approvals = [
    {
      id: '1',
      titleEn: 'Leave Request',
      titleAr: 'طلب إجازة',
      descriptionEn: 'Annual leave request for 5 days',
      descriptionAr: 'طلب إجازة سنوية لمدة 5 أيام',
      type: 'leave',
      status: 'pending',
      requesterId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent mx-auto mb-2" />
        <p>{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
      </div>
    );
  }

  if (!approvals.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>{isRTL ? 'لا توجد موافقات معلقة' : 'No pending approvals'}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
      {approvals.map((approval) => (
        <ApprovalCard
          key={approval.id}
          approval={approval}
          onApprove={(id) => updateStatus(id, 'approved')}
          onReject={(id) => updateStatus(id, 'rejected')}
          disabled={loading}
        />
      ))}
    </div>
  );
};