
import React, { useState } from 'react';
import { AppTab, Campaign, Lead, UserProfile, IntegrationStatus } from './types';
import { INITIAL_USER, INITIAL_INTEGRATIONS, MOCK_CAMPAIGNS, MOCK_LEADS } from './constants';
import HomeTab from './tabs/Home';
import CreateTab from './tabs/CreateCampaign';
import PerformanceTab from './tabs/Performance';
import CreativesTab from './tabs/Creatives';
import DiscoverTab from './tabs/Discover';
import IntegrationsTab from './tabs/Integrations';
import LeadsTab from './tabs/Leads';
import ProfileTab from './tabs/Profile';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Home);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [integrations, setIntegrations] = useState<IntegrationStatus>(INITIAL_INTEGRATIONS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [prefilledTemplate, setPrefilledTemplate] = useState<any>(null);
  const [safetyStatus, setSafetyStatus] = useState({ budgetCap: true, alerts: true });

  const addCampaign = (newCampaign: Campaign) => {
    setCampaigns(prev => [newCampaign, ...prev]);
    setActiveTab(AppTab.Performance);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  const toggleIntegration = (platform: keyof IntegrationStatus) => {
    setIntegrations(prev => ({
      ...prev,
      [platform]: !prev[platform],
      lastSyncedAt: new Date().toISOString()
    }));
  };

  const adaptTemplate = (template: any) => {
    setPrefilledTemplate(template);
    setActiveTab(AppTab.Create);
  };

  const applyRecommendation = (action: string) => {
    alert(`Success: ${action}`);
  };

  const renderTab = () => {
    switch (activeTab) {
      case AppTab.Home:
        return (
          <HomeTab 
            user={user} 
            campaigns={campaigns} 
            leads={leads} 
            setActiveTab={setActiveTab} 
            safetyStatus={safetyStatus}
            setSafetyStatus={setSafetyStatus}
            applyRecommendation={applyRecommendation}
          />
        );
      case AppTab.Create:
        return <CreateTab user={user} addCampaign={addCampaign} prefilledTemplate={prefilledTemplate} />;
      case AppTab.Performance:
        return <PerformanceTab campaigns={campaigns} setCampaigns={setCampaigns} updateCampaign={updateCampaign} />;
      case AppTab.Creatives:
        return <CreativesTab user={user} adaptTemplate={adaptTemplate} />;
      case AppTab.Discover:
        return <DiscoverTab adaptTemplate={adaptTemplate} />;
      case AppTab.Integrations:
        return <IntegrationsTab integrations={integrations} toggleIntegration={toggleIntegration} />;
      case AppTab.Leads:
        return <LeadsTab leads={leads} updateStatus={updateLeadStatus} integrations={integrations} setActiveTab={setActiveTab} />;
      case AppTab.Profile:
        return <ProfileTab user={user} setUser={setUser} />;
      default:
        return <HomeTab user={user} campaigns={campaigns} leads={leads} setActiveTab={setActiveTab} safetyStatus={safetyStatus} setSafetyStatus={setSafetyStatus} applyRecommendation={applyRecommendation} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#4B2BBE] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#4B2BBE] font-bold text-xl">M</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">MediaGrowth</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1 overflow-x-auto">
            {Object.values(AppTab).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setPrefilledTemplate(null); }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#4B2BBE]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
              <span className="text-xs font-bold">{user.businessName[0]}</span>
            </div>
          </div>
        </div>
        <div className="md:hidden flex overflow-x-auto border-t border-white/10 bg-[#4B2BBE]">
          {Object.values(AppTab).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setPrefilledTemplate(null); }}
              className={`flex-shrink-0 px-4 py-3 text-xs font-medium ${
                activeTab === tab ? 'border-b-2 border-white text-white' : 'text-white/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-6">
        {renderTab()}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2024 MediaGrowth India. Helping SMBs Grow Faster.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Help Center</a>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <span className="text-gray-300">|</span>
            <span className="text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded text-gray-600">v1.1.0 Interactive</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
