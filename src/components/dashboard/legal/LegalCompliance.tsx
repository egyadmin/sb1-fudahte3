import React, { useState } from 'react';
import { LegalDocuments } from './documents/LegalDocuments';
import { ComplianceChecklist } from './compliance/ComplianceChecklist';
import { ContractStatus } from './contracts/ContractStatus';
import { LegalDocumentForm } from './forms/LegalDocumentForm';
import { ComplianceChecklistForm } from './forms/ComplianceChecklistForm';
import { ComplianceTrainingForm } from './forms/ComplianceTrainingForm';
import { ComplianceAuditForm } from './forms/ComplianceAuditForm';
import { ContractForm } from './forms/ContractForm';

export const LegalCompliance: React.FC = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const renderForm = () => {
    switch (activeForm) {
      case 'document':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <LegalDocumentForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'checklist':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ComplianceChecklistForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'training':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ComplianceTrainingForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'audit':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ComplianceAuditForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'contract':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ContractForm onClose={() => setActiveForm(null)} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderForm()}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LegalDocuments onAddDocument={() => setActiveForm('document')} />
        </div>
        <div className="space-y-6">
          <ComplianceChecklist 
            onAddChecklist={() => setActiveForm('checklist')}
            onAddTraining={() => setActiveForm('training')}
            onAddAudit={() => setActiveForm('audit')}
          />
          <ContractStatus onAddContract={() => setActiveForm('contract')} />
        </div>
      </div>
    </div>
  );
};