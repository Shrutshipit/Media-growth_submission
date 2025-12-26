
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, Campaign, BusinessCategory } from '../types';
import { TEMPLATES } from '../constants';
import { parseVoiceInput } from '../services/gemini';

interface CreateTabProps {
  user: UserProfile;
  addCampaign: (c: Campaign) => void;
  prefilledTemplate?: any;
}

const CreateTab: React.FC<CreateTabProps> = ({ user, addCampaign, prefilledTemplate }) => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'Guided' | 'Voice'>('Guided');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');
  const [voiceText, setVoiceText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const [formData, setFormData] = useState({
    name: 'New Campaign',
    goal: 'Get WhatsApp leads',
    location: user.city,
    pincode: '',
    intent: 'Nearby customers',
    budget: 500,
    duration: 7,
    platform: ['Meta', 'Google'],
    templateId: TEMPLATES[0].id,
    headline: TEMPLATES[0].headline,
    offer: TEMPLATES[0].offer
  });

  useEffect(() => {
    if (prefilledTemplate) {
      setFormData(prev => ({
        ...prev,
        templateId: prefilledTemplate.id,
        headline: prefilledTemplate.headline,
        offer: prefilledTemplate.offer
      }));
    }
  }, [prefilledTemplate]);

  // Voice Recording Initialization
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = user.language === 'Hindi' ? 'hi-IN' : 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setVoiceText(prev => prev + ' ' + event.results[i][0].transcript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [user.language]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setVoiceText('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleVoiceSubmit = async () => {
    if (!voiceText.trim()) return;
    setLoading(true);
    const parsed = await parseVoiceInput(voiceText);
    if (parsed) {
      setFormData(prev => ({
        ...prev,
        goal: parsed.goal || prev.goal,
        location: parsed.city || prev.location,
        budget: Math.max(200, parsed.budget || prev.budget)
      }));
      setMode('Guided');
      setStep(1);
    }
    setLoading(false);
  };

  const togglePlatform = (p: string) => {
    setFormData(prev => ({
      ...prev,
      platform: prev.platform.includes(p) 
        ? prev.platform.filter(item => item !== p)
        : [...prev.platform, p]
    }));
  };

  const launch = () => {
    const newCampaign: Campaign = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      goal: formData.goal,
      platforms: formData.platform,
      location: formData.location,
      budgetPerDay: formData.budget,
      durationDays: formData.duration,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      leadsCount: 0,
      spend: 0,
      cpl: 0
    };
    addCampaign(newCampaign);
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-bold text-gray-900">What is your main goal?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { id: 'Get WhatsApp leads', icon: '💬', desc: 'People message you directly' },
          { id: 'Get calls', icon: '📞', desc: 'Receive phone inquiries' },
          { id: 'Get orders', icon: '🛒', desc: 'Direct sales on your website' },
          { id: 'Get store visits', icon: '📍', desc: 'Drive footfall to your shop' },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => setFormData({ ...formData, goal: g.id })}
            className={`p-6 rounded-2xl border-2 text-left transition-all ${
              formData.goal === g.id ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-white'
            }`}
          >
            <span className="text-3xl mb-3 block">{g.icon}</span>
            <p className="font-bold text-lg text-gray-900">{g.id}</p>
            <p className="text-sm text-gray-500">{g.desc}</p>
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button onClick={() => setStep(2)} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Next: Audience</button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-bold text-gray-900">Where are your customers?</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target City</label>
          <select 
            value={formData.location} 
            onChange={e => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
          >
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Bangalore</option>
            <option>Pune</option>
            <option>Kolkata</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Areas (Pincodes - Optional)</label>
          <input 
            type="text" 
            placeholder="e.g. 400001, 400002"
            value={formData.pincode}
            onChange={e => setFormData({ ...formData, pincode: e.target.value })}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Intent</label>
          <div className="flex flex-wrap gap-2">
            {["Nearby customers", "People searching now", "Fashion lovers", "Budget conscious"].map(chip => (
              <button
                key={chip}
                onClick={() => setFormData({ ...formData, intent: chip })}
                className={`px-4 py-2 rounded-full border text-sm transition-all ${
                  formData.intent === chip ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={() => setStep(1)} className="text-gray-500 font-bold px-8 py-3">Back</button>
        <button onClick={() => setStep(3)} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Next: Budget & Creative</button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Budget & Duration</h3>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Daily Budget</label>
              <span className="font-bold text-primary">₹{formData.budget}</span>
            </div>
            <input 
              type="range" min="200" max="5000" step="100"
              value={formData.budget}
              onChange={e => setFormData({ ...formData, budget: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <div className="grid grid-cols-3 gap-3">
              {[3, 7, 14].map(d => (
                <button
                  key={d}
                  onClick={() => setFormData({ ...formData, duration: d })}
                  className={`py-3 rounded-xl border-2 font-semibold ${
                    formData.duration === d ? 'border-primary bg-primary/5' : 'border-gray-100'
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Creative Preview</h3>
            <button 
              onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')}
              className="text-xs font-bold px-3 py-1 rounded-lg border-2 border-primary text-primary"
            >
              Switch to {language === 'English' ? 'Hindi' : 'English'}
            </button>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden max-w-sm mx-auto">
            <img src={TEMPLATES.find(t => t.id === formData.templateId)?.imageUrl} className="w-full h-64 object-cover" />
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <input 
                  className="w-full text-lg font-bold text-gray-900 bg-transparent focus:bg-gray-50 p-1 outline-none border-b border-transparent focus:border-gray-200" 
                  value={language === 'Hindi' ? "आज का ऑफर" : formData.headline} 
                  onChange={e => setFormData({ ...formData, headline: e.target.value })}
                />
                <input 
                  className="w-full text-sm text-gray-600 bg-transparent focus:bg-gray-50 p-1 outline-none border-b border-transparent focus:border-gray-200" 
                  value={language === 'Hindi' ? "सबसे शानदार कलेक्शन पर पाएं 20% छूट" : formData.offer} 
                  onChange={e => setFormData({ ...formData, offer: e.target.value })}
                />
              </div>
              <button className={`w-full text-white py-3 rounded-lg font-bold flex items-center justify-center space-x-2 ${formData.goal === 'Get WhatsApp leads' ? 'bg-[#25D366]' : 'bg-primary'}`}>
                <span>{formData.goal.replace('Get ', '')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div>
          <h4 className="font-bold text-gray-900">Recommended Platforms</h4>
          <p className="text-sm text-gray-500">We'll automatically choose the best placements for your goal.</p>
        </div>
        <div className="flex space-x-4">
          {['Meta', 'Google'].map(p => (
            <label key={p} className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.platform.includes(p)} 
                onChange={() => togglePlatform(p)}
                className="w-5 h-5 accent-primary" 
              />
              <span className="text-sm font-medium">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setStep(2)} className="text-gray-500 font-bold px-8 py-3">Back</button>
        <button onClick={launch} className="bg-primary text-white px-12 py-3 rounded-xl font-bold shadow-lg shadow-primary/30">Launch Campaign 🚀</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-center mb-4">
        <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex">
          <button 
            onClick={() => setMode('Guided')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'Guided' ? 'bg-primary text-white' : 'text-gray-500'}`}
          >
            Guided 3-Step
          </button>
          <button 
            onClick={() => setMode('Voice')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'Voice' ? 'bg-primary text-white' : 'text-gray-500'}`}
          >
            Voice/NLP Assist
          </button>
        </div>
      </div>

      {mode === 'Voice' ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 animate-fadeIn">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Describe your campaign</h3>
            <p className="text-gray-500">Just tell us what you want to promote and we'll handle the rest.</p>
          </div>
          <div className="relative">
            <textarea
              className="w-full h-40 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg"
              placeholder="e.g. I want to promote my new summer collection in Mumbai for college students with a budget of 500 rupees a day..."
              value={voiceText}
              onChange={(e) => setVoiceText(e.target.value)}
            />
            <button 
              onClick={toggleRecording}
              className={`absolute bottom-4 right-4 text-white p-4 rounded-full shadow-lg transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-[#F7941D]'}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
            </button>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={handleVoiceSubmit}
              disabled={loading || !voiceText.trim()}
              className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Parse & Pre-fill Form'}
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <p className="w-full text-center text-xs font-bold text-gray-400 uppercase">Try saying:</p>
            {["Mumbai fitness promotion, ₹500/day", "Get calls for salon in Pune", "Orders for fashion brand"].map(tip => (
              <button key={tip} onClick={() => setVoiceText(tip)} className="text-xs bg-gray-100 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-200">
                "{tip}"
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10 px-4">
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step >= s ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {s}
                  </div>
                  <span className={`text-xs mt-2 font-bold ${step >= s ? 'text-primary' : 'text-gray-400'}`}>
                    {s === 1 ? 'Goal' : s === 2 ? 'Audience' : 'Review'}
                  </span>
                </div>
                {s < 3 && <div className={`flex-grow h-1 mx-4 rounded-full ${step > s ? 'bg-primary' : 'bg-gray-100'}`}></div>}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      )}
    </div>
  );
};

export default CreateTab;
