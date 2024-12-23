import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useHR } from '../../../../hooks/useHR';
import { FileText, Upload, Download, Search } from 'lucide-react';
import { FileUpload } from '../../../common/FileUpload';

export const PolicyDocuments: React.FC = () => {
  const { language } = useLanguage();
  const { policies } = useHR();
  const isRTL = language === 'ar';
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleFileSelect = async (file: File) => {
    // Handle file upload logic
    console.log('File selected:', file);
  };

  const filteredPolicies = policies.filter((policy: any) => {
    const matchesSearch = (
      policy.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.title_ar.includes(searchTerm)
    );
    const matchesCategory = categoryFilter === 'all' || policy.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h3 className="text-lg font-semibold">
            {isRTL ? 'وثائق السياسات' : 'Policy Documents'}
          </h3>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <Upload className="w-5 h-5" />
        </button>
      </div>

      {showUpload && (
        <div className="mb-4">
          <FileUpload
            accept=".pdf"
            onFileSelect={handleFileSelect}
            label={isRTL ? 'تحميل وثيقة سياسة' : 'Upload Policy Document'}
          />
        </div>
      )}

      <div className="mb-4 space-y-2">
        <div className="flex items-center bg-gray-50 rounded-lg p-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isRTL ? 'البحث في السياسات...' : 'Search policies...'}
            className="ml-2 bg-transparent border-none focus:outline-none w-full"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="all">{isRTL ? 'جميع الفئات' : 'All Categories'}</option>
          <option value="general">{isRTL ? 'عام' : 'General'}</option>
          <option value="leave">{isRTL ? 'إجازة' : 'Leave'}</option>
          <option value="conduct">{isRTL ? 'السلوك' : 'Conduct'}</option>
          <option value="benefits">{isRTL ? 'المزايا' : 'Benefits'}</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredPolicies.map((policy: any) => (
          <div key={policy.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div>
              <h4 className="font-medium">
                {isRTL ? policy.title_ar : policy.title_en}
              </h4>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                  {isRTL ? 'الإصدار' : 'v'}{policy.version}
                </span>
                <span className="mx-2">•</span>
                <span>
                  {new Date(policy.effective_date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};