import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useHR } from '../../../../hooks/useHR';
import { UserPlus, Filter, Upload } from 'lucide-react';
import { FileUpload } from '../../../common/FileUpload';

export const RecruitmentPipeline: React.FC = () => {
  const { language } = useLanguage();
  const { recruitment, positions } = useHR();
  const isRTL = language === 'ar';
  const [showUpload, setShowUpload] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleFileSelect = async (file: File) => {
    // Handle file upload logic
    console.log('File selected:', file);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <UserPlus className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'خط أنابيب التوظيف' : 'Recruitment Pipeline'}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Upload className="w-5 h-5" />
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border rounded-lg p-2"
          >
            <option value="all">{isRTL ? 'جميع المناصب' : 'All Positions'}</option>
            <option value="open">{isRTL ? 'مفتوح' : 'Open'}</option>
            <option value="in_progress">{isRTL ? 'قيد التقدم' : 'In Progress'}</option>
            <option value="closed">{isRTL ? 'مغلق' : 'Closed'}</option>
          </select>
        </div>
      </div>

      {showUpload && (
        <div className="mb-4">
          <FileUpload
            accept=".xlsx,.xls"
            onFileSelect={handleFileSelect}
            label={isRTL ? 'تحميل بيانات المرشحين' : 'Upload Candidates Data'}
          />
        </div>
      )}

      <div className="space-y-3">
        {recruitment.map((item: any) => (
          <div key={item.id} className="p-3 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">
                  {isRTL ? item.position.title_ar : item.position.title_en}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {isRTL ? item.position.department.name_ar : item.position.department.name_en}
                </p>
              </div>
              <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(item.status)}`}>
                {item.applicants_count} {isRTL ? 'متقدم' : 'applicants'}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>
                {isRTL ? 'تاريخ البدء:' : 'Start Date:'} {new Date(item.start_date).toLocaleDateString()}
              </span>
              {item.end_date && (
                <span>
                  {isRTL ? 'تاريخ الانتهاء:' : 'End Date:'} {new Date(item.end_date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};