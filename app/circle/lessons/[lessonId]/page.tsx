'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data (would be dynamic in real app)
const mockLesson = {
  id: 'hf-1',
  courseId: 'herbal-foundations',
  courseName: 'Herbal Foundations',
  title: 'Welcome to Herbal Wellness',
  description: 'An introduction to the world of herbal healing and what you\'ll learn in this course. We\'ll cover the history of herbal medicine, the principles behind it, and set you up for success.',
  type: 'video' as const,
  content: 'https://example.com/video.mp4',
  duration: 15,
  order: 1,
  resources: [
    { id: 'r1', name: 'Welcome Guide PDF', type: 'pdf' as const, url: '/resources/welcome.pdf' },
    { id: 'r2', name: 'Herb Reference Sheet', type: 'pdf' as const, url: '/resources/herbs.pdf' },
  ],
  isPreview: true,
  transcript: `Welcome to Herbal Foundations! \n\nIn this course, we're going to explore the incredible world of herbal wellness together. \n\nFor thousands of years, people around the world have turned to plants for healing. In the Caribbean, this tradition runs deep - passed down through generations, blending knowledge from Africa, India, and indigenous peoples.\n\nToday, we're seeing a renaissance in herbal wellness. More and more people are looking for natural ways to support their health, reduce stress, improve sleep, and boost their energy.\n\nIn this course, you'll learn:\n- The basic principles of herbal medicine\n- How to select the right herbs for your needs  \n- Proper brewing techniques\n- How to create sustainable wellness rituals\n\nLet's begin this journey together. I'm excited to share this knowledge with you!`,
};

export default function LessonPage() {
  const [showTranscript, setShowTranscript] = useState(false);
  const [completed, setCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-500">
      {/* Top Header */}
      <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6">
        <Link 
          href={`/circle/courses`} 
          className="flex items-center gap-2 group transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-orange-500/50">
             <span className="text-muted group-hover:text-orange-500 transition-colors">←</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-orange-500">Back To library</span>
        </Link>
        
        <div className="text-center hidden md:block">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 leading-none mb-1 italic">Now learning</p>
           <h2 className="text-xs font-bold uppercase italic tracking-tight">{mockLesson.title}</h2>
        </div>

        <button 
          onClick={() => setCompleted(!completed)}
          className={`btn-vibrant transition-all !py-1.5 !px-4 !text-[10px] uppercase tracking-widest ${completed ? '!from-green-500 !to-emerald-600' : ''}`}
        >
          {completed ? '✓ Module Done' : 'Complete Module'}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Immersive Video Holder */}
            <div className="frosted-card aspect-video border-[4px] border-white/5 overflow-hidden group shadow-2xl relative">
               <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl shadow-xl shadow-orange-500/40 cursor-pointer hover:scale-110 transition-transform">
                     ▶
                  </div>
               </div>
               {/* Controls Simulation */}
               <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">04:20 / 15:00</div>
                  <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-orange-500 w-[28%]" />
                  </div>
               </div>
            </div>

            {/* Content Details */}
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <span className="badge-frosted badge-orange uppercase text-[9px] font-black italic">Module {mockLesson.order}</span>
                  <span className="text-[11px] font-bold text-muted uppercase tracking-[0.2em]">{mockLesson.duration} Minutes Duration</span>
               </div>
               <h1 className="h1-dense uppercase italic tracking-tighter text-3xl">{mockLesson.title}</h1>
               <p className="text-sm text-muted leading-relaxed font-medium">
                  {mockLesson.description}
               </p>
            </div>

            {/* Interactive Transcript */}
            <div className="frosted-card overflow-hidden">
               <button 
                 onClick={() => setShowTranscript(!showTranscript)}
                 className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
               >
                  <div className="flex items-center gap-3">
                     <span className="text-orange-500">📄</span>
                     <span className="text-[10px] font-black uppercase tracking-widest italic">Full Transcript {showTranscript ? '(-)' : '(+)'}</span>
                  </div>
                  <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Read Along</span>
               </button>
               {showTranscript && (
                 <div className="p-6 border-t border-white/5 bg-black/10">
                    <p className="text-[12px] leading-relaxed text-muted whitespace-pre-line italic font-medium">
                       {mockLesson.transcript}
                    </p>
                 </div>
               )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
             {/* Resources Widget */}
             <div className="frosted-card p-5">
                <h3 className="font-black text-[10px] uppercase tracking-widest italic text-orange-500 mb-4">Study materials</h3>
                <div className="space-y-3">
                   {mockLesson.resources.map(res => (
                     <div key={res.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-orange-500/50 transition-all">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-black text-[10px]">PDF</div>
                           <p className="text-[10px] font-bold uppercase tracking-tight text-muted group-hover:text-foreground transition-colors">{res.name}</p>
                        </div>
                        <span className="text-[10px] text-muted group-hover:text-orange-500">↓</span>
                     </div>
                   ))}
                </div>
             </div>

             {/* Ritual Notes Widget */}
             <div className="frosted-card p-5 border-blue-500/10">
                <h3 className="font-black text-[10px] uppercase tracking-widest italic text-blue-500 mb-4">Ritual notes</h3>
                <textarea 
                  placeholder="Capture your insights here..."
                  className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-[11px] text-muted h-32 outline-none focus:border-blue-500/50 transition-all font-medium placeholder:italic"
                />
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted/40 mt-3 text-right italic italic italic">Autosaving to cloud</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
