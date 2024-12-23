import React from 'react';
import { useFinancialReports } from '../../../../hooks/useFinancialReports';
import { ReportItem } from './ReportItem';

export const ReportList: React.FC = () => {
  const { reports } = useFinancialReports();
  
  return (
    <div className="space-y-3 mt-4">
      {reports.map((report) => (
        <ReportItem key={report.id} {...report} />
      ))}
    </div>
  );
};