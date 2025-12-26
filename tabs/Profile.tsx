
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileTabProps {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, setUser }) => {
  const [selectedTone, setSelectedTone] = useState('Fun & Quirky');

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header Profile Section */}
      <div className="bg-gradient-to-r from-[#4B2BBE] to-[#9c27b0] p-8 rounded-3xl text-white flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 shadow-xl">
        <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-4xl font-bold">
          {user.businessName[0]}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold">{user.businessName}</h2>
          <p className="text-white/80 font-medium">{user.category} • {user.city}</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full border border-white/20">Free Plan</span>
            <span className="bg-green-400/20 text-green-200 text-xs font-bold px-3 py-1 rounded-full border border-green-400/40">Verified Business</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Business Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Business Name</label>
              <input 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                value={user.businessName}
                onChange={e => setUser({ ...user, businessName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Category</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                value={user.category}
                onChange={e => setUser({ ...user, category: e.target.value as any })}
              >
                <option>D2C Fashion</option>
                <option>Salon</option>
                <option>Restaurant</option>
                <option>Electronics Retail</option>
                <option>Coaching</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">City</label>
              <input 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                value={user.city}
                onChange={e => setUser({ ...user, city: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-gray-900">App Language</p>
                <p className="text-xs text-gray-500">Currently in {user.language}</p>
              </div>
              <button 
                onClick={() => setUser({ ...user, language: user.language === 'English' ? 'Hindi' : 'English' })}
                className="text-primary font-bold text-sm bg-white px-4 py-1.5 rounded-lg border border-primary hover:bg-primary hover:text-white transition-colors"
              >
                Switch to {user.language === 'English' ? 'Hindi' : 'English'}
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Brand Kit (D2C)</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">Brand Colors</p>
              <div className="flex flex-wrap gap-4">
                {user.brandColors.map((color, i) => (
                  <div key={i} className="group relative">
                    <div className="w-12 h-12 rounded-2xl shadow-md border-2 border-white" style={{ backgroundColor: color }}></div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {color}
                    </span>
                  </div>
                ))}
                <button className="w-12 h-12 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">
                  +
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">Tone of Voice</p>
              <div className="grid grid-cols-2 gap-2">
                {['Professional', 'Fun & Quirky', 'Premium', 'Trust-focused'].map(tone => (
                  <button 
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                      selectedTone === tone ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">Brand Logo</p>
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center group hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🖼️</span>
                <p className="text-xs font-bold text-gray-500">Upload your logo</p>
                <p className="text-[10px] text-gray-400 mt-1">Recommended 500x500 PNG</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-3xl">✨</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">MediaGrowth Pro</h3>
              <p className="text-sm text-gray-500 mt-1">Unlock AI Copywriting, Advanced Retargeting, and Multi-user access.</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-[#F7941D] text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-accent/30 hover:scale-105 transition-transform">
            Upgrade Plan
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileTab;
