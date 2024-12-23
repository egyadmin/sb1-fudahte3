import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { Approval } from '../../../lib/supabase/approvals/types';

interface ApprovalCardProps {
  approval: Approval;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  disabled?: boolean;
}

export const ApprovalCard: React.FC<ApprovalCardProps> = ({
  approval,
  onApprove,
  onReject,
  disabled
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-gray-900">
            {isRTL ? approval.titleAr : approval.titleEn}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {isRTL ? approval.descriptionAr : approval.descriptionEn}
          </p>
        </div>
        <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(approval.status)}`}>
          {approval.status === 'pending' ? (isRTL ? 'قيد الانتظار' : 'Pending') :
           approval.status === 'approved' ? (isRTL ? 'تمت الموافقة' : 'Approved') :
           (isRTL ? 'مرفوض' : 'Rejected')}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Calendar className="w-4 h-4 mr-1" />
        <span>{new Date(approval.createdAt).toLocaleDateString(isRTL ? 'ar' : 'en')}</span>
        <Clock className="w-4 h-4 mr-1 ml-4" />
        <span>{new Date(approval.createdAt).toLocaleTimeString(isRTL ? 'ar' : 'en')}</span>
      </div>

      {approval.status === 'pending' && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onApprove(approval.id)}
            disabled={disabled}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'موافقة' : 'Approve'}
          </button>
          <button
            onClick={() => onReject(approval.id)}
            disabled={disabled}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'رفض' : 'Reject'}
          </button>
        </div>
      )}
    </div>
  );
};