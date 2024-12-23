import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Eye, Download, History, Share2 } from 'lucide-react';

interface DocumentActionsProps {
  onView: () => void;
  onDownload: () => void;
  onHistory?: () => void;
  onShare?: () => void;
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({
  onView,
  onDownload,
  onHistory,
  onShare
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onView}
        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        title={isRTL ? 'عرض' : 'View'}
      >
        <Eye className="w-5 h-5" />
      </button>
      <button
        onClick={onDownload}
        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        title={isRTL ? 'تحميل' : 'Download'}
      >
        <Download className="w-5 h-5" />
      </button>
      {onHistory && (
        <button
          onClick={onHistory}
          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          title={isRTL ? 'السجل' : 'History'}
        >
          <History className="w-5 h-5" />
        </button>
      )}
      {onShare && (
        <button
          onClick={onShare}
          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          title={isRTL ? 'مشاركة' : 'Share'}
        >
          <Share2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};