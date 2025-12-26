
import React, { useState } from 'react';
import { IntegrationStatus } from '../types';

interface IntegrationsTabProps {
  integrations: IntegrationStatus;
  toggleIntegration: (platform: keyof IntegrationStatus) => void;
}

const IntegrationsTab: React.FC<IntegrationsTabProps> = ({ integrations, toggleIntegration }) => {
  const [showModal, setShowModal] = useState<string | null>(null);

  const PLATFORMS = [
    { id: 'metaConnected', name: 'Meta Ads', icon: 'FB', desc: 'Instagram, Facebook, Messenger' },
    { id: 'googleConnected', name: 'Google Ads', icon: 'G', desc: 'Search, YouTube, Maps' },
    { id: 'whatsappConnected', name: 'WhatsApp Business', icon: 'WA', desc: 'Direct chat lead capture' },
    { id: 'reelsConnected', name: 'Instagram Insights', icon: 'IG', desc: 'Reels & Trends Data' },
    { id: 'localPartnerConnected', name: 'Local Listings', icon: 'LL', desc: 'IndiaMart, JustDial Integration' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Connect Your Shop</h2>
        <p className="text-gray-500">Enable cross-platform syncing to see all your ads in one place.</p>
        <p className="text-xs text-primary font-bold mt-2">Last Synced: {new Date(integrations.lastSyncedAt).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PLATFORMS.map((p) => {
          const isConnected = (integrations as any)[p.id];
          return (
            <div key={p.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
                isConnected ? 'bg-[#4B2BBE]' : 'bg-gray-300'
              }`}>
                {p.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{p.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                <button 
                  onClick={() => isConnected ? toggleIntegration(p.id as any) : setShowModal(p.name)}
                  className={`mt-4 w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                    isConnected ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-primary text-white hover:shadow-lg'
                  }`}
                >
                  {isConnected ? 'Disconnect Account' : `Connect ${p.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(null)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-scaleIn">
            <h3 className="text-xl font-bold text-center mb-4">Connecting {showModal}</h3>
            <p className="text-gray-500 text-center text-sm mb-6">MediaGrowth needs permission to manage your ads and view insights.</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-grow">
                  <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-2 w-1/3 bg-gray-200 rounded mt-2 animate-pulse"></div>
                </div>
              </div>
              <button 
                onClick={() => {
                  toggleIntegration(PLATFORMS.find(p => p.name === showModal)?.id as any);
                  setShowModal(null);
                }}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold"
              >
                Confirm Connection
              </button>
              <button onClick={() => setShowModal(null)} className="w-full text-gray-400 font-bold py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationsTab;
