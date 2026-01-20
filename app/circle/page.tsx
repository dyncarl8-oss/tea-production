import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { Sidebar } from '@/components/Sidebar';
import Link from 'next/link';

export default async function HomeDashboard() {
  let userId: string;
  let user: any;
  let role: 'admin' | 'member' | 'affiliate' | 'visitor' = 'visitor';

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    user = await whopsdk.users.retrieve(userId);
    role = 'member';
  } catch (error) {
    // Silent fail for non-whop context (dev)
    userId = 'mock-user';
    user = { name: 'Wellness Hunter', profile_picture: { url: null } };
    role = 'member';
  }

  const displayName = user?.name || user?.username || 'Hunter';
  const avatarUrl = user?.profile_picture?.url || null;

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Sidebar role={role} userName={displayName} userAvatar={avatarUrl} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-1000">
          
          {/* Welcome Header */}
          <div className="pb-6 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-2 italic">Member Ecosystem</p>
              <h1 className="h1-dense uppercase italic tracking-tighter text-5xl">Peace, {displayName.split(' ')[0]}</h1>
            </div>
            <div className="flex gap-2">
               <span className="badge-frosted badge-orange uppercase text-[9px] font-black italic">Inner Circle</span>
               <span className="badge-frosted badge-blue uppercase text-[9px] font-black italic">Rank: Seedling</span>
            </div>
          </div>

          {/* Unified High-Level Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             <div className="frosted-card p-5 border-orange-500/10">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1 italic">Transformation</p>
                <p className="text-3xl font-black italic tracking-tighter text-orange-500">65%</p>
                <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                   <div className="h-full bg-orange-500 w-[65%]" />
                </div>
             </div>
             <div className="frosted-card p-5 border-green-500/10">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1 italic">Revenue Shared</p>
                <p className="text-3xl font-black italic tracking-tighter text-green-500">$242.50</p>
                <p className="text-[8px] font-black uppercase tracking-widest mt-1 opacity-50">This Month</p>
             </div>
             <div className="frosted-card p-5 border-blue-500/10">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1 italic">Ritual Streak</p>
                <p className="text-3xl font-black italic tracking-tighter text-blue-500">12 Days</p>
                <p className="text-[8px] font-black uppercase tracking-widest mt-1 opacity-50">Personal High</p>
             </div>
             <div className="frosted-card p-5 border-white/5">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1 italic">New Assets</p>
                <p className="text-3xl font-black italic tracking-tighter">8</p>
                <p className="text-[8px] font-black uppercase tracking-widest mt-1 opacity-50">Ready to share</p>
             </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
             {/* Education Column */}
             <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                   <h2 className="h2-dense uppercase italic tracking-tight">Current Focus</h2>
                   <div className="flex-1 h-[1px] bg-white/5" />
                </div>
                
                <div className="frosted-card p-8 group relative overflow-hidden flex flex-col md:flex-row gap-8 hover:border-orange-500/30 transition-all duration-700">
                   <div className="w-full md:w-1/3 aspect-video bg-orange-500/10 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-700">
                      🌿
                   </div>
                   <div className="flex-1 flex flex-col justify-center">
                      <span className="badge-frosted badge-orange uppercase text-[8px] font-black mb-2">Module 03</span>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2 group-hover:text-orange-500 transition-colors">Understanding Bio-Synergy</h3>
                      <p className="text-xs text-muted leading-relaxed font-medium mb-6 italic italic">Explore how Caribbean sea moss interacts with turmeric to amplify anti-inflammatory effects by up to 200%.</p>
                      <Link href="/circle/courses/herbal-foundations" className="btn-vibrant !w-fit !px-8 !py-3 !text-[10px] uppercase tracking-widest">Resume Learning</Link>
                   </div>
                </div>

                {/* Quick Growth Widget */}
                <div className="frosted-card p-8 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="font-black text-[12px] uppercase tracking-[0.2em] italic text-blue-500 leading-none">Your Growth Engine</h3>
                      <Link href="/affiliate" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-blue-500">View Toolkit →</Link>
                   </div>
                   <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-blue-500/50 transition-all cursor-pointer">
                         <div className="flex items-center gap-3">
                            <span className="text-xl">📊</span>
                            <div>
                               <p className="text-[10px] font-black uppercase italic italic">Active Links</p>
                               <p className="text-[9px] text-muted font-medium">3 Tracking Pathways</p>
                            </div>
                         </div>
                         <span className="text-blue-500 font-bold">→</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-blue-500/50 transition-all cursor-pointer">
                         <div className="flex items-center gap-3">
                            <span className="text-xl">📸</span>
                            <div>
                               <p className="text-[10px] font-black uppercase italic italic">Media library</p>
                               <p className="text-[9px] text-muted font-medium">Download Assets</p>
                            </div>
                         </div>
                         <span className="text-blue-500 font-bold">→</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Column: Social & Community */}
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <h2 className="h2-dense uppercase italic tracking-tight">Inner Circle Feed</h2>
                   <div className="flex-1 h-[1px] bg-white/5" />
                </div>
                
                <div className="space-y-4">
                   {[
                     { user: 'Maya G.', action: 'Unlocked Rank 2', icon: '💎' },
                     { user: 'Herbalist Sam', action: 'Daily Ritual Completed', icon: '🍵' },
                     { user: 'Founder D.', action: 'New Masterclass Live', icon: '🎥' }
                   ].map(feed => (
                     <div key={feed.user} className="frosted-card p-4 flex items-center gap-4 border-white/5 hover:border-orange-500/20 transition-all duration-500 cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/5 flex items-center justify-center text-xl">{feed.icon}</div>
                        <div>
                           <p className="text-[11px] font-black italic italic uppercase tracking-tighter leading-none mb-1">{feed.user}</p>
                           <p className="text-[9px] text-muted font-bold uppercase tracking-widest opacity-60">{feed.action}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <Link href="/circle/community" className="btn-vibrant !w-full !from-zinc-700 !to-zinc-900 border border-white/5 !py-3 !text-[10px] uppercase tracking-widest mt-4">Join The Discussion</Link>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
