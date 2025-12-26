
import React, { useState } from 'react';

interface DiscoverTabProps {
  adaptTemplate: (t: any) => void;
}

const DiscoverTab: React.FC<DiscoverTabProps> = ({ adaptTemplate }) => {
  const [cat, setCat] = useState('All Categories');

  const FEED_ITEMS = [
    {
      business: "Saree Sansar",
      category: "D2C Fashion",
      result: "150+ WhatsApp Leads",
      why: ["Used high-quality video hooks", "Targeted local Mumbai circles", "Clear 'Direct WhatsApp' button"],
      image: "https://picsum.photos/seed/dis1/400/500"
    },
    {
      business: "Skin Glow Salon",
      category: "Salon",
      result: "₹50 CPL achieved",
      why: ["Limited time 50% discount", "Focus on testimonials", "Retargeted previous visitors"],
      image: "https://picsum.photos/seed/dis2/400/500"
    },
    {
      business: "FitIndia Gym",
      category: "Local Services",
      result: "300% ROI in 14 days",
      why: ["Free trial week call to action", "User-generated content (UGC)", "Automated follow-ups"],
      image: "https://picsum.photos/seed/dis3/400/500"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Discover & Inspo</h2>
          <p className="text-gray-500">See what's working for other SMBs in your region.</p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="p-3 bg-white border border-gray-200 rounded-xl text-sm font-bold focus:ring-primary focus:ring-2 outline-none"
          >
            <option>All Categories</option>
            <option>D2C Fashion</option>
            <option>Restaurants</option>
            <option>Salons</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEED_ITEMS.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col">
            <div className="h-56 relative">
              <img src={item.image} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="bg-[#4B2BBE] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {item.category}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg border border-white/40">
                <p className="text-xs font-bold text-green-700">{item.result}</p>
              </div>
            </div>
            <div className="p-6 flex-grow space-y-4">
              <h4 className="font-bold text-lg text-gray-900">{item.business} Case Study</h4>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">WHY IT WORKED</p>
                <ul className="space-y-1.5">
                  {item.why.map((point, j) => (
                    <li key={j} className="text-sm text-gray-600 flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 mt-auto">
                <button 
                  onClick={() => adaptTemplate({ id: 't-discover', headline: `Inspired by ${item.business}`, offer: 'Special Collection - Shop Now' })}
                  className="w-full bg-primary/5 text-primary py-3 rounded-xl font-bold hover:bg-primary/10 transition-colors"
                >
                  Adapt This Campaign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 text-center">
        <p className="text-sm text-orange-800 font-medium">
          Note: These examples are curated from top performers this week. Results vary by business and region.
        </p>
      </div>
    </div>
  );
};

export default DiscoverTab;
