
import React from 'react';
import { AppTab, Campaign, Lead, UserProfile } from '../types';

interface HomeTabProps {
  user: UserProfile;
  campaigns: Campaign[];
  leads: Lead[];
  setActiveTab: (tab: AppTab) => void;
  safetyStatus: { budgetCap: boolean, alerts: boolean };
  setSafetyStatus: (s: any) => void;
  applyRecommendation: (action: string) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ user, campaigns, leads, setActiveTab, safetyStatus, setSafetyStatus, applyRecommendation }) => {
  const activeCount = campaigns.filter(c => c.status === 'Active').length;
  const totalLeads = leads.length;
  const avgCpl = campaigns.reduce((acc, c) => acc + c.cpl, 0) / (campaigns.length || 1);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.businessName}! 👋</h2>
          <p className="text-gray-500 mt-1">Your main goal: <span className="font-semibold text-primary">{user.defaultGoal}</span></p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab(AppTab.Create)}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-[#3d239c] transition-colors"
          >
            Create New Campaign
          </button>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Spend", value: "₹1,450", trend: "+5%", positive: false },
          { label: "Total Leads", value: totalLeads, trend: "+12%", positive: true },
          { label: "Active Ads", value: activeCount, trend: "Stable", positive: true },
          { label: "Avg. Cost/Lead", value: `₹${Math.round(avgCpl)}`, trend: "-2%", positive: true },
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm font-medium">{card.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${card.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#F7941D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Smart Recommendations
          </h3>
          <div className="space-y-3">
            <div className="bg-white border-l-4 border-[#F7941D] p-4 rounded-r-xl shadow-sm flex items-start space-x-4">
              <div className="flex-grow">
                <p className="font-semibold text-gray-900">Shift budget to Instagram Reels</p>
                <p className="text-sm text-gray-600 mt-1">Reels are performing 20% better than Search ads for you this week. Want to re-allocate ₹200 from Google to Meta?</p>
              </div>
              <button 
                onClick={() => applyRecommendation("Budget re-allocated to Reels")}
                className="text-primary font-bold text-sm hover:underline"
              >
                Apply
              </button>
            </div>
            <div className="bg-white border-l-4 border-primary p-4 rounded-r-xl shadow-sm flex items-start space-x-4">
              <div className="flex-grow">
                <p className="font-semibold text-gray-900">New high-performing template available</p>
                <p className="text-sm text-gray-600 mt-1">D2C Fashion brands in Mumbai are seeing high conversion with "Video Hook" templates. Try it now.</p>
              </div>
              <button onClick={() => setActiveTab(AppTab.Creatives)} className="text-primary font-bold text-sm hover:underline">View</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Safety Status</h3>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${safetyStatus.budgetCap ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">Budget Cap: {safetyStatus.budgetCap ? 'ON' : 'OFF'}</p>
                  <p className="text-xs text-gray-500">Max ₹2,000 / day</p>
                </div>
              </div>
              <button 
                onClick={() => setSafetyStatus({ ...safetyStatus, budgetCap: !safetyStatus.budgetCap })}
                className="text-xs text-primary font-bold"
              >
                {safetyStatus.budgetCap ? 'Disable' : 'Enable'}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${safetyStatus.alerts ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">Alerts: {safetyStatus.alerts ? 'ENABLED' : 'DISABLED'}</p>
                  <p className="text-xs text-gray-500">WhatsApp & Email</p>
                </div>
              </div>
              <button 
                onClick={() => setSafetyStatus({ ...safetyStatus, alerts: !safetyStatus.alerts })}
                className="text-xs text-primary font-bold"
              >
                Manage
              </button>
            </div>
          </div>

          <div className="bg-[#4B2BBE]/5 p-5 rounded-2xl border border-[#4B2BBE]/20">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">How to use MediaGrowth</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Start by connecting your accounts in <b>Integrations</b>. Then use the <b>Create</b> tab to launch an ad. We'll handle the complex bidding!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
