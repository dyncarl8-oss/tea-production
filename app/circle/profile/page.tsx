import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { Sidebar } from '@/components/Sidebar';

export default async function ProfilePage() {
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
    redirect('/circle');
  }

  const displayName = user?.name || user?.username || 'Hunter';
  const avatarUrl = user?.profile_picture?.url || null;

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Sidebar role={role} userName={displayName} userAvatar={avatarUrl} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="pb-6 border-b border-border">
            <h1 className="h1-dense uppercase italic tracking-tighter">Your Progress</h1>
            <p className="sub-dense">Tracking your transformation and ritual consistency.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="frosted-card p-6">
                <h3 className="font-bold text-xs uppercase tracking-widest mb-4 italic">Member Identity</h3>
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-3xl">
                      {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover rounded-2xl" /> : '👤'}
                   </div>
                   <div>
                      <p className="font-black text-xl tracking-tighter uppercase italic">{displayName}</p>
                      <span className="badge-frosted badge-orange mt-1 uppercase text-[10px]">Verified Member</span>
                   </div>
                </div>
             </div>

             <div className="frosted-card p-6 flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">Completion Status</p>
                <div className="flex justify-between items-end mb-1">
                   <span className="text-2xl font-black italic">65%</span>
                   <span className="text-[10px] text-muted uppercase">To Next Rank</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-orange-500 w-[65%]" />
                </div>
             </div>
          </div>

          <div className="frosted-card p-12 text-center">
              <p className="text-muted text-sm italic">Detailed achievements and ritual logs are being synchronised. Check back after your next deep-steep brew! 🍵</p>
          </div>
        </div>
      </main>
    </div>
  );
}
