import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';

interface Column {
  key: string;
  titleEn: string;
  titleAr: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface PrintPreviewTableProps {
  columns: Column[];
  data: any[];
  className?: string;
}

export const PrintPreviewTable: React.FC<PrintPreviewTableProps> = ({
  columns,
  data,
  className = ''
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className={`print-table-wrapper ${className}`}>
      <table className="w-full border-collapse print-table">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={`p-2 border text-${column.align || 'start'}`}
                style={{ width: column.width }}
              >
                {isRTL ? column.titleAr : column.titleEn}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className={`p-2 border text-${column.align || 'start'}`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};