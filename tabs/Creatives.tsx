
import React from 'react';
import { UserProfile } from '../types';
import { TEMPLATES } from '../constants';

interface CreativesTabProps {
  user: UserProfile;
  adaptTemplate: (t: any) => void;
}

const CreativesTab: React.FC<CreativesTabProps> = ({ user, adaptTemplate }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Creative Library</h2>
          <p className="text-gray-500">Pick a template or get inspired by trends.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm">
          Generate New Copy AI
        </button>
      </div>

      {/* Templates Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-lg">🎨</span>
          Templates for your {user.category} business
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                <img src={t.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <button 
                    onClick={() => adaptTemplate(t)}
                    className="w-full bg-white text-gray-900 py-2 rounded-xl font-bold text-sm"
                  >
                    Edit & Launch
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{t.type}</span>
                <h4 className="font-bold text-gray-900 mt-1">{t.headline}</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{t.offer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reels Library Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center mr-3 text-lg">🎬</span>
          High-Performing Reels Structure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              hook: "Stop scrolling! Do you also make this mistake?",
              structure: "Hook -> The Pain -> The Solution -> Offer",
              script: "Are you struggling with unmanageable hair? 3 secrets I used to get salon finish at home...",
              cta: "WhatsApp for a free consult"
            },
            {
              hook: "3 outfits I wore this week (Mumbai Edition)",
              structure: "Rapid Showcase -> Fabric Detail -> Where to Buy",
              script: "Monday blues? Not with our cotton co-ord set. Breathable, chic and local!",
              cta: "Shop the collection"
            },
            {
              hook: "POV: You found the perfect ethnic wear shop",
              structure: "Store walk-in -> Closeups -> Price Reveal",
              script: "Located in Dadar, we bring you the finest silk sarees under ₹5,000.",
              cta: "Get store location"
            }
          ].map((reel, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 border-t-4 border-primary">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">THE HOOK</p>
                <p className="font-bold text-gray-900 italic">"{reel.hook}"</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">STRUCTURE</p>
                <p className="text-sm text-gray-700">{reel.structure}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200">
                <p className="text-[10px] font-bold text-gray-400 uppercase">SCRIPT SNIPPET</p>
                <p className="text-sm text-gray-600 leading-relaxed mt-1">{reel.script}</p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-accent">{reel.cta}</span>
                <button className="text-primary text-xs font-bold hover:underline">Copy Script</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CreativesTab;
