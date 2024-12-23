import React, { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import { useLegalDocuments } from '../../../../hooks/useLegalDocuments';
import { DocumentCard } from './DocumentCard';

interface LegalDocumentsProps {
  onAddDocument: () => void;
}

export const LegalDocuments: React.FC<LegalDocumentsProps> = ({ onAddDocument }) => {
  const { language } = useLanguage();
  const { documents } = useLegalDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const isRTL = language === 'ar';

  // Filter documents based on search and type
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = (
      doc.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.titleAr.includes(searchTerm)
    );
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className={`w-5 h-5 text-indigo-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <h2 className="text-xl font-semibold">
            {isRTL ? 'المكتبة القانونية' : 'Legal Library'}
          </h2>
        </div>
        <button
          onClick={onAddDocument}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'إضافة وثيقة' : 'Add Document'}
        </button>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { titleEn: 'Active Documents', titleAr: 'الوثائق النشطة', count: 24, color: 'bg-green-50 text-green-700' },
          { titleEn: 'Pending Review', titleAr: 'قيد المراجعة', count: 5, color: 'bg-yellow-50 text-yellow-700' },
          { titleEn: 'Expiring Soon', titleAr: 'تنتهي قريباً', count: 3, color: 'bg-red-50 text-red-700' },
          { titleEn: 'Total Documents', titleAr: 'إجمالي الوثائق', count: 32, color: 'bg-blue-50 text-blue-700' }
        ].map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-lg p-4`}>
            <h3 className="text-sm font-medium">
              {isRTL ? stat.titleAr : stat.titleEn}
            </h3>
            <p className="text-2xl font-bold mt-1">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isRTL ? 'البحث في الوثائق...' : 'Search documents...'}
            className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none bg-white"
          >
            <option value="all">{isRTL ? 'جميع الأنواع' : 'All Types'}</option>
            <option value="license">{isRTL ? 'رخص' : 'Licenses'}</option>
            <option value="policy">{isRTL ? 'سياسات' : 'Policies'}</option>
            <option value="certificate">{isRTL ? 'شهادات' : 'Certificates'}</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocuments.map((document) => (
          <DocumentCard key={document.id} {...document} />
        ))}
      </div>
    </div>
  );
};