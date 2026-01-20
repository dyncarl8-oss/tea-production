import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { Sidebar } from '@/components/Sidebar';

export default async function CircleDashboard() {
  // 1. Verify User Authentication (Server-Side)
  let userId: string;
  let user: any;
  let role: 'admin' | 'member' | 'affiliate' | 'visitor' = 'visitor';

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    user = await whopsdk.users.retrieve(userId);
    console.log(`[CIRCLE] Auth Verified - UserID: ${userId} | Name: ${user.name || user.username}`);
    role = 'member';
  } catch (error) {
    console.error('[CIRCLE] Auth Failed:', error);
    redirect('/stems');
  }

  const displayName = user?.name || user?.username || 'Hunter';
  const avatarUrl = user?.profile_picture?.url || null;

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Sidebar 
        role={role} 
        userName={displayName} 
        userAvatar={avatarUrl}
      />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <h1 className="h1-dense">Welcome back, {displayName}</h1>
              <p className="sub-dense">Your herbal wellness journey continues here.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="badge-frosted badge-orange">PRO MEMBER ⚡</span>
              <button className="btn-vibrant">Daily Ritual</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="frosted-card p-4">
              <p className="sub-dense">Community Post Karma</p>
              <h3 className="text-3xl font-bold text-orange-500">1,240</h3>
            </div>
            <div className="frosted-card p-4">
              <p className="sub-dense">Workshops Joined</p>
              <h3 className="text-3xl font-bold">12</h3>
            </div>
            <div className="frosted-card p-4">
              <p className="sub-dense">Wellness Streak</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold">7 Days</h3>
                <span className="badge-frosted badge-green">🔥 Hot</span>
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left Col - Feed/Modules */}
            <div className="lg:col-span-2 space-y-6">
              <section className="space-y-4">
                <h2 className="h2-dense px-1">Curated Workshops</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Symptom to Stems", icon: "🌿", status: "Active" },
                    { title: "Mindful Brewing", icon: "☕", status: "New" }
                  ].map((item, i) => (
                    <div key={i} className="frosted-card group cursor-pointer hover:border-orange-500/50 transition-all p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        {item.status === 'New' && <span className="badge-frosted badge-blue">New</span>}
                      </div>
                      <h4 className="font-bold group-hover:text-orange-500 transition-colors uppercase tracking-widest text-xs">{item.title}</h4>
                      <p className="text-xs text-muted mt-1 leading-relaxed">Deep dive into the world of herbal synergies and mindful practices.</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="frosted-card p-1">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="font-bold text-sm tracking-widest uppercase">Community Feed</h3>
                  <button className="text-[10px] text-muted hover:text-orange-500 uppercase tracking-widest font-bold">See all</button>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-bold">Sarah_Wellness</span>
                         <span className="text-[10px] text-muted">2m ago</span>
                      </div>
                      <p className="text-xs leading-relaxed">Just tried the new Blue Lotus blend, it's absolutely phenomenal! Feeling tranquil. 🧘‍♂️</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Progress/Leaderboard */}
            <div className="space-y-6">
              <div className="frosted-card p-5">
                <h3 className="h2-dense mb-4">Goal Progress</h3>
                <div className="space-y-4">
                   <div>
                      <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-widest">
                        <span>The Deep Steep Course</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[80%]" />
                      </div>
                   </div>
                   <button className="w-full btn-vibrant text-xs py-2 mt-2">Resume Learning</button>
                </div>
              </div>

              <div className="frosted-card overflow-hidden">
                <div className="p-4 bg-white/5 border-b border-white/10">
                  <h3 className="font-bold text-xs tracking-widest uppercase italic">Weekly Leaders 🏆</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted">0{i+1}</span>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                        <span className="text-xs font-medium">User_{i+102}</span>
                      </div>
                      <span className="text-[10px] font-bold text-orange-500">2.4k pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
