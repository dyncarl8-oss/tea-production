'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { useSearchParams } from 'next/navigation';

// Data mapping symptoms to blends
const blendMapping = {
  stress: {
    name: 'Calm Shores',
    emoji: '🌊',
    benefit: 'Reduces cortisol and promotes deep relaxation.',
    ingredients: ['Passionflower', 'Lemon Balm', 'Caribbean Sea Moss'],
    ritual: 'Steep for 7 minutes. Sip while breathing deeply in through the nose for 4 counts.',
    learn: 'Sea moss contains magnesium, which is essential for nervous system regulation during high-stress periods.'
  },
  sleep: {
    name: 'Midnight Bloom',
    emoji: '🌙',
    benefit: 'Shortens time to fall asleep and improves REM quality.',
    ingredients: ['Valerian Root', 'Chamomile', 'Nutmeg'],
    ritual: 'Brew 30 minutes before bed. Avoid blue light while consuming.',
    learn: 'Valerian root has been used since ancient Greece to treat insomnia and anxiety.'
  },
  energy: {
    name: 'Solar Pulse',
    emoji: '☀️',
    benefit: 'Sustained energy without the caffeine crash.',
    ingredients: ['Guayusa', 'Ginger', 'Turmeric'],
    ritual: 'Best consumed before 11 AM. Add a splash of lime for vitamin C synergy.',
    learn: 'Guayusa provides a balanced release of caffeine and contains double the antioxidants of green tea.'
  },
  immunity: {
    name: 'Guardian Root',
    emoji: '🛡️',
    benefit: 'Strengthens the seasonal defense system.',
    ingredients: ['Elderberry', 'Echinacea', 'Wild Sorrel'],
    ritual: 'Drink twice daily during seasonal changes. Inhale the steam before sipping.',
    learn: 'Wild sorrel is a Caribbean powerhouse of Vitamin C and bioflavonoids.'
  }
};

export default function StemsPage() {
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState('');

  const handleRecommend = (symptom: string) => {
    setSelectedSymptom(symptom);
    setStep('result');
    // Generate a mock functional referral link
    setReferralLink(`https://thesteepcircle.com/shop?ref=STEEP_MEMBER&blend=${symptom}`);
  };

  const currentBlend = selectedSymptom ? blendMapping[selectedSymptom as keyof typeof blendMapping] : null;

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Sidebar role="member" userName="Member" />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="pb-6 border-b border-border">
            <h1 className="h1-dense uppercase italic tracking-tighter text-4xl">Herbal Guide</h1>
            <p className="sub-dense">Convert your symptoms into sacred stems.</p>
          </div>

          {step === 'input' ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="frosted-card p-12 text-center border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
                <span className="text-6xl mb-6 block drop-shadow-2xl">🌱</span>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">What does your body need today?</h2>
                <p className="text-muted max-w-md mx-auto italic font-medium">Select a wellness focus to discover your perfect Caribbean-inspired ritual.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { id: 'stress', label: 'Stress Relief', icon: '🧘' },
                  { id: 'sleep', label: 'Deep Sleep', icon: '🌙' },
                  { id: 'energy', label: 'Clean Energy', icon: '⚡' },
                  { id: 'immunity', label: 'Seasonal Defense', icon: '🛡️' }
                ].map((s) => (
                  <button 
                    key={s.id}
                    onClick={() => handleRecommend(s.id)}
                    className="frosted-card p-6 flex flex-col items-center group hover:border-orange-500/50 hover:scale-[1.05] transition-all duration-500"
                  >
                    <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-orange-500 transition-colors">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
              <button 
                onClick={() => setStep('input')}
                className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-orange-500 transition-colors"
                >
                ← Return to selection
              </button>

              <div className="grid md:grid-cols-5 gap-8">
                {/* Product Detail Card */}
                <div className="md:col-span-3 space-y-6">
                   <div className="frosted-card p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
                      <div className="flex items-center gap-4 mb-6">
                         <span className="text-6xl">{currentBlend?.emoji}</span>
                         <div>
                            <span className="badge-frosted badge-orange uppercase text-[9px] font-black italic mb-1">Recommended Blend</span>
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter">{currentBlend?.name}</h2>
                         </div>
                      </div>
                      <p className="text-lg font-bold italic text-foreground/80 mb-6 border-l-4 border-orange-500 pl-4">
                        "{currentBlend?.benefit}"
                      </p>
                      
                      <div className="space-y-4">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2 italic">Essential Ingredients</p>
                            <div className="flex flex-wrap gap-2">
                               {currentBlend?.ingredients.map(ing => (
                                 <span key={ing} className="badge-frosted bg-white/5 border-white/10 italic">{ing}</span>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="frosted-card p-8 border-blue-500/20 bg-blue-500/5">
                      <h3 className="font-black text-[10px] uppercase tracking-widest italic text-blue-500 mb-4 tracking-[0.2em]">The Ritual</h3>
                      <p className="text-sm font-medium italic text-muted leading-relaxed">
                        {currentBlend?.ritual}
                      </p>
                   </div>
                </div>

                {/* Sales & Referral Engine */}
                <div className="md:col-span-2 space-y-6">
                   <div className="frosted-card p-6 border-green-500/20 bg-green-500/5">
                      <h3 className="font-black text-[10px] uppercase tracking-widest italic text-green-500 mb-4 tracking-[0.2em]">Educate & Share</h3>
                      <p className="text-[11px] font-medium leading-relaxed mb-6 italic italic">
                        {currentBlend?.learn}
                      </p>
                      <div className="space-y-3">
                         <button className="btn-vibrant !w-full !py-3 !text-[11px] uppercase tracking-widest">Buy This Blend</button>
                         <div className="pt-4 border-t border-white/5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-2">Your Referral Link</p>
                            <div className="flex gap-2">
                               <input 
                                 readOnly 
                                 value={referralLink}
                                 className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3 text-[9px] font-mono outline-none"
                               />
                               <button 
                                 onClick={() => navigator.clipboard.writeText(referralLink)}
                                 className="badge-frosted badge-orange !py-2 !px-4 hover:scale-105 active:scale-95 transition-all"
                               >
                                 COPY
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="frosted-card p-6 bg-gradient-to-br from-zinc-800 to-black border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1 italic">Growth Goal</p>
                      <p className="text-[11px] font-bold italic mb-4">Share this blend with 3 friends to unlock the "Master Ritualist" badge.</p>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-orange-500 w-[33%]" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
