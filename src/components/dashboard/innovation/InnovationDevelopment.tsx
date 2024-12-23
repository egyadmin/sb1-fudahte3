import React, { useState } from 'react';
import { OpportunityBoard } from './opportunities/OpportunityBoard';
import { SuggestionBox } from './suggestions/SuggestionBox';
import { MarketTrends } from './market/MarketTrends';
import { OpportunityForm } from './forms/OpportunityForm';

export const InnovationDevelopment = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <OpportunityForm onClose={() => setShowForm(false)} />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OpportunityBoard onAddOpportunity={() => setShowForm(true)} />
        </div>
        <div className="space-y-6">
          <SuggestionBox />
          <MarketTrends />
        </div>
      </div>
    </div>
  );
};