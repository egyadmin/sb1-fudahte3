import React, { useState } from 'react';
import { AuditLogs } from './audits/AuditLogs';
import { SafetyGuidelines } from './safety/SafetyGuidelines';
import { ComplianceDashboard } from './compliance/ComplianceDashboard';
import { QualityStandardForm } from './forms/QualityStandardForm';
import { AuditForm } from './forms/AuditForm';
import { SafetyGuidelineForm } from './forms/SafetyGuidelineForm';
import { EmergencyProtocolForm } from './forms/EmergencyProtocolForm';

export const QualityManagement = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const renderForm = () => {
    switch (activeForm) {
      case 'standard':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <QualityStandardForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'audit':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <AuditForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'safety':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SafetyGuidelineForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'emergency':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <EmergencyProtocolForm onClose={() => setActiveForm(null)} />
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
          <ComplianceDashboard onAddStandard={() => setActiveForm('standard')} />
        </div>
        <div className="space-y-6">
          <AuditLogs onAddAudit={() => setActiveForm('audit')} />
          <SafetyGuidelines 
            onAddGuideline={() => setActiveForm('safety')}
            onAddProtocol={() => setActiveForm('emergency')}
          />
        </div>
      </div>
    </div>
  );
};