import React from 'react';

export const PrintStyles: React.FC = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A4 landscape;
            margin: 1.5cm;
          }

          /* Reset styles for printing */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-shadow: none !important;
          }

          body {
            font-family: 'Times New Roman', serif;
            line-height: 1.5;
            color: #000;
            background: #fff;
          }

          /* Hide non-printable elements */
          .print\\:hidden,
          button:not(.print-show),
          nav,
          header {
            display: none !important;
          }

          /* Layout */
          .print-container {
            width: 100%;
            margin: 0;
            padding: 0;
          }

          /* Headers */
          .print-header {
            text-align: center;
            margin-bottom: 1.5cm;
            border-bottom: 2pt solid #000;
            padding-bottom: 0.5cm;
          }

          .print-header h1 {
            font-size: 24pt;
            margin-bottom: 0.3cm;
          }

          .print-header .logo {
            width: 3cm;
            height: auto;
            margin: 0 auto 0.5cm;
          }

          /* Content */
          .print-section {
            margin-bottom: 1cm;
            page-break-inside: avoid;
          }

          .print-section h2 {
            font-size: 16pt;
            margin-bottom: 0.5cm;
            border-bottom: 1pt solid #000;
            padding-bottom: 0.2cm;
          }

          .print-section h3 {
            font-size: 14pt;
            margin-bottom: 0.3cm;
          }

          /* Tables */
          .print-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0.8cm;
          }

          .print-table th,
          .print-table td {
            border: 0.5pt solid #000;
            padding: 0.2cm;
            text-align: left;
          }

          .print-table th {
            background-color: #f0f0f0 !important;
            font-weight: bold;
          }

          /* RTL Support */
          [dir="rtl"] {
            text-align: right;
          }

          [dir="rtl"] .print-table th,
          [dir="rtl"] .print-table td {
            text-align: right;
          }

          /* Page breaks */
          .print-break-before {
            page-break-before: always;
          }

          .print-break-after {
            page-break-after: always;
          }

          .print-avoid-break {
            page-break-inside: avoid;
          }

          /* Signatures */
          .print-signatures {
            margin-top: 2cm;
            page-break-inside: avoid;
          }

          .signature-line {
            border-bottom: 1pt solid #000;
            width: 60%;
            margin: 1cm auto 0.3cm;
          }

          .signature-title {
            text-align: center;
            font-size: 10pt;
            color: #666;
          }

          /* Footer */
          .print-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 9pt;
            color: #666;
            border-top: 0.5pt solid #ccc;
            padding-top: 0.3cm;
          }

          .print-footer .page-number:after {
            content: counter(page);
          }

          /* Charts and Graphs */
          .print-chart {
            max-width: 100%;
            height: auto;
            page-break-inside: avoid;
          }

          /* Metrics and KPIs */
          .print-metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5cm;
            margin-bottom: 1cm;
          }

          .print-metric {
            border: 0.5pt solid #ccc;
            padding: 0.3cm;
            text-align: center;
          }

          .print-metric .value {
            font-size: 16pt;
            font-weight: bold;
            margin: 0.2cm 0;
          }

          /* Notes Section */
          .print-notes {
            border: 0.5pt solid #ccc;
            padding: 0.5cm;
            margin-top: 1cm;
            min-height: 3cm;
          }
        }
      `}
    </style>
  );
};