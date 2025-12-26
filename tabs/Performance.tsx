
import React, { useState } from 'react';
import { Campaign } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_CHART_DATA = [
  { name: 'Mon', leads: 4 },
  { name: 'Tue', leads: 7 },
  { name: 'Wed', leads: 5 },
  { name: 'Thu', leads: 12 },
  { name: 'Fri', leads: 18 },
  { name: 'Sat', leads: 14 },
  { name: 'Sun', leads: 22 },
];

interface PerformanceTabProps {
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
}

const PerformanceTab: React.FC<PerformanceTabProps> = ({ campaigns, setCampaigns, updateCampaign }) => {
  const [filter, setFilter] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [guards, setGuards] = useState<Record<string, { autoPause: boolean }>>({});

  const toggleStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
    ));
  };

  const toggleGuard = (id: string) => {
    setGuards(prev => ({
      ...prev,
      [id]: { autoPause: !prev[id]?.autoPause }
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Performance Dashboard</h2>
        <div className="flex space-x-2">
          {['All', 'Meta', 'Google'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                filter === f ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 grid grid-cols-2 gap-4">
          {[
            { label: 'Total Spend', value: '₹17,500', color: 'text-primary' },
            { label: 'WhatsApp Leads', value: '180', color: 'text-green-600' },
            { label: 'Total Calls', value: '45', color: 'text-blue-600' },
            { label: 'Cost per Lead', value: '₹97', color: 'text-[#F7941D]' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase">{kpi.label}</p>
              <p className={`text-xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Lead Trends (Last 7 Days)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="leads" stroke="#4B2BBE" strokeWidth={3} dot={{ r: 4, fill: '#4B2BBE' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Your Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase">
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Leads</th>
                <th className="px-6 py-4">Spend</th>
                <th className="px-6 py-4">CPL</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.goal}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{c.leadsCount}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">₹{c.spend}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">₹{Math.round(c.cpl)}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => toggleStatus(c.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                          c.status === 'Active' ? 'text-red-600 border-red-100 hover:bg-red-50' : 'text-green-600 border-green-100 hover:bg-green-50'
                        }`}
                      >
                        {c.status === 'Active' ? 'Pause' : 'Resume'}
                      </button>
                      <button 
                        onClick={() => setSelectedCampaign(c)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-100 text-gray-500 hover:bg-gray-100"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCampaign && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedCampaign(null)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-slideLeft p-8 overflow-y-auto">
            <button onClick={() => setSelectedCampaign(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCampaign.name}</h3>
            <p className="text-gray-500 mb-8 font-medium">Goal: {selectedCampaign.goal}</p>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs font-bold text-gray-400 uppercase">Conversion Rate</p>
                  <p className="text-xl font-bold text-primary">4.2%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs font-bold text-gray-400 uppercase">ROAS (Proxy)</p>
                  <p className="text-xl font-bold text-primary">3.5x</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Creative Comparison</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Creative A (Static)', weight: 80, seed: 'c1' },
                    { label: 'Creative B (Video)', weight: 20, seed: 'c2' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${item.seed}/100/100`} alt="Ad Thumbnail" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-bold text-gray-900">{item.label}</p>
                        <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                          <div className="bg-primary h-full transition-all duration-500" style={{ width: `${item.weight}%` }}></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-600">{item.weight}% leads</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-orange-50 rounded-xl flex items-center space-x-3">
                  <span className="text-xl">💡</span>
                  <p className="text-xs text-orange-800 font-medium">Suggestion: Pause Creative B as it has a much higher CPL.</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Trust Controls</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                    <div>
                      <p className="text-sm font-bold">Auto-pause Guard</p>
                      <p className="text-xs text-gray-500">Pause if CPL exceeds ₹150</p>
                    </div>
                    <button 
                      onClick={() => toggleGuard(selectedCampaign.id)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${guards[selectedCampaign.id]?.autoPause ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${guards[selectedCampaign.id]?.autoPause ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTab;
