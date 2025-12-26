
import React, { useState } from 'react';
import { Lead, IntegrationStatus, AppTab } from '../types';

interface LeadsTabProps {
  leads: Lead[];
  updateStatus: (id: string, s: Lead['status']) => void;
  integrations: IntegrationStatus;
  setActiveTab: (t: AppTab) => void;
}

const LeadsTab: React.FC<LeadsTabProps> = ({ leads, updateStatus, integrations, setActiveTab }) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(leads[0] || null);

  const handleReply = (l: Lead) => {
    const text = encodeURIComponent(`Hi ${l.nameMasked.split(' ')[0]}, this is from MediaGrowth. How can we help you?`);
    window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
  };

  if (!integrations.whatsappConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-4xl mb-6">💬</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect WhatsApp Business</h2>
        <p className="text-gray-500 text-center max-w-sm mb-8">Launch your ads and receive leads directly into your WhatsApp inbox. Connect now to manage them here.</p>
        <button 
          onClick={() => setActiveTab(AppTab.Integrations)}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg"
        >
          Connect WhatsApp
        </button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
      {/* List */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="w-full p-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex-grow overflow-y-auto">
          {leads.map((l) => (
            <div 
              key={l.id}
              onClick={() => setSelectedLead(l)}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                selectedLead?.id === l.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <p className="font-bold text-gray-900 text-sm">{l.nameMasked}</p>
                <span className="text-[10px] text-gray-400 font-medium">10:30 AM</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{l.message}</p>
              <div className="mt-2 flex">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  l.status === 'Converted' ? 'bg-green-100 text-green-700' : 
                  l.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                  l.status === 'Not interested' ? 'bg-gray-100 text-gray-600' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {l.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-grow flex flex-col h-full">
        {selectedLead ? (
          <>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{selectedLead.nameMasked}</h3>
                <p className="text-xs text-gray-500">Source: Campaign #{selectedLead.sourceCampaignId}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => updateStatus(selectedLead.id, 'Converted')}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-700 transition-colors"
                >
                  Mark Converted
                </button>
                <button 
                  onClick={() => handleReply(selectedLead)}
                  className="bg-[#25D366] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1fb355] transition-colors"
                >
                  Reply on WhatsApp
                </button>
              </div>
            </div>
            <div className="flex-grow p-6 space-y-4 overflow-y-auto">
              <div className="flex flex-col space-y-2">
                <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none max-w-sm">
                  <p className="text-xs font-bold text-gray-400 mb-1">CUSTOMER</p>
                  <p className="text-sm text-gray-800 leading-relaxed">{selectedLead.message}</p>
                </div>
                <p className="text-[10px] text-gray-400 ml-2">{selectedLead.timestamp}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex space-x-2">
                {['Contacted', 'Not interested'].map((st) => (
                  <button 
                    key={st}
                    onClick={() => updateStatus(selectedLead.id, st as any)}
                    className="flex-grow py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm"
                  >
                    Move to {st}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-400 font-medium">
            Select a lead to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsTab;
