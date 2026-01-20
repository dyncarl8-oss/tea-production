import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { Sidebar } from '@/components/Sidebar';

export default async function AffiliateDashboard() {
  // 1. Verify User Authentication (Server-Side)
  let userId: string;
  let user: any;
  let role: 'admin' | 'member' | 'affiliate' | 'visitor' = 'visitor';

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    user = await whopsdk.users.retrieve(userId);
    console.log(`[AFFILIATE] Auth Verified - UserID: ${userId} | Name: ${user.name || user.username}`);
    role = 'affiliate';
  } catch (error) {
    console.error('[AFFILIATE] Auth Failed:', error);
    redirect('/stems');
  }

  const displayName = user?.name || user?.username || 'Partner';
  const avatarUrl = user?.profile_picture?.url || null;

  // Mock affiliate data
  const stats = {
    earnings: 2450.00,
    referrals: 47,
    clicks: 1250,
    conversionRate: 8.5,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Sidebar 
        role={role} 
        userName={displayName} 
        userAvatar={avatarUrl}
      />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <h1 className="h1-dense">Affiliate Dashboard</h1>
              <p className="sub-dense">Manage your referrals and track your wellness earnings.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="badge-frosted badge-orange">Gold Level Partner 💎</span>
              <button className="btn-vibrant">Export Report</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="frosted-card p-4">
              <p className="sub-dense">Total Earnings</p>
              <h3 className="text-2xl font-bold text-green-500">${stats.earnings.toLocaleString()}</h3>
            </div>
            <div className="frosted-card p-4">
              <p className="sub-dense">Active Referrals</p>
              <h3 className="text-2xl font-bold">{stats.referrals}</h3>
            </div>
            <div className="frosted-card p-4">
              <p className="sub-dense">Monthly Clicks</p>
              <h3 className="text-2xl font-bold">{stats.clicks}</h3>
            </div>
            <div className="frosted-card p-4">
              <p className="sub-dense">Conv. Rate</p>
              <h3 className="text-2xl font-bold text-orange-500">{stats.conversionRate}%</h3>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left Col - Links & Assets */}
            <div className="lg:col-span-2 space-y-6">
              <div className="frosted-card p-1">
                 <div className="p-4 border-b border-white/10">
                    <h3 className="font-bold text-xs tracking-widest uppercase">Your Global Referral Links</h3>
                 </div>
                 <div className="p-4 space-y-3">
                   <div className="p-3 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between gap-4">
                     <div className="min-w-0">
                       <p className="font-bold text-[10px] uppercase tracking-widest text-orange-500">Main Community Link</p>
                       <p className="text-xs truncate text-muted font-mono">thesteepcircle.com/ref/{user?.username || 'partner'}</p>
                     </div>
                     <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-[10px] font-bold uppercase tracking-widest rounded-md border border-white/10 transition-colors">Copy</button>
                   </div>
                   <div className="p-3 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between gap-4">
                     <div className="min-w-0">
                       <p className="font-bold text-[10px] uppercase tracking-widest text-blue-500">Course Bundle Link</p>
                       <p className="text-xs truncate text-muted font-mono">thesteepcircle.com/courses?ref={user?.username || 'partner'}</p>
                     </div>
                     <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-[10px] font-bold uppercase tracking-widest rounded-md border border-white/10 transition-colors">Copy</button>
                   </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h2 className="h2-dense italic">Promotional Assets</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="aspect-square frosted-card flex flex-col items-center justify-center p-4 group cursor-pointer">
                         <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                         <span className="text-[10px] font-bold uppercase text-muted">Graphic 0{i}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Right Col - Payouts/Activity */}
            <div className="space-y-6">
              <div className="frosted-card p-5">
                <h3 className="h2-dense mb-4 italic">Next Payout</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <span className="text-3xl font-bold tracking-tight text-white">$420.00</span>
                      <span className="badge-frosted badge-blue">Processing</span>
                   </div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Estimated: Feb 1st, 2026</p>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[70%]" />
                   </div>
                   <button className="w-full btn-vibrant text-xs py-2 mt-2">Manage Payouts</button>
                </div>
              </div>

              <div className="frosted-card overflow-hidden">
                <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                  <h3 className="font-bold text-xs tracking-widest uppercase">Referral History</h3>
                  <span className="text-[10px] font-bold text-orange-500 italic">Live Feed</span>
                </div>
                <div className="divide-y divide-white/5">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-md bg-green-500/10 border border-green-500/20 flex items-center justify-center text-[10px] text-green-500 font-bold">$</div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest">Sale #{(i+2341).toString()}</p>
                          <p className="text-[9px] text-muted leading-none">Standard Membership</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-green-500">+$15.00</span>
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
