import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { Sidebar } from '@/components/Sidebar';

// Mock referral links (In real app, this would be from DB)
const mockLinks = [
  { id: '1', name: 'Main Website', url: 'https://thesteepircle.com', code: 'STEEPVIP1', type: 'product', clicks: 450, conversions: 38, earnings: 285.00, created: '2024-01-15' },
  { id: '2', name: 'Symptom Tool', url: 'https://thesteepircle.com/stems', code: 'STEEPVIP2', type: 'symptom-tool', clicks: 320, conversions: 28, earnings: 195.50, created: '2024-01-20' },
  { id: '3', name: 'Membership Page', url: 'https://thesteepircle.com/circle', code: 'STEEPVIP3', type: 'subscription', clicks: 180, conversions: 15, earnings: 449.85, created: '2024-02-01' },
];

export default async function LinksPage() {
  let userId: string;
  let user: any;
  let role: 'admin' | 'member' | 'affiliate' | 'visitor' = 'visitor';

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    user = await whopsdk.users.retrieve(userId);
    role = 'affiliate';
  } catch (error) {
    redirect('/circle');
  }

  const displayName = user?.name || user?.username || 'Hunter';
  const avatarUrl = user?.profile_picture?.url || null;

  const totalEarnings = mockLinks.reduce((sum, link) => sum + link.earnings, 0);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Sidebar role={role} userName={displayName} userAvatar={avatarUrl} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="pb-6 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="h1-dense uppercase italic tracking-tighter">Referral Links</h1>
              <p className="sub-dense">Convert your audience with unique referral pathways.</p>
            </div>
            <button className="btn-vibrant !text-[10px] uppercase tracking-widest">+ Create Pathway</button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             <div className="frosted-card p-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1">Total Path Earnings</p>
                <p className="text-2xl font-black italic text-orange-500">${totalEarnings.toFixed(2)}</p>
             </div>
             <div className="frosted-card p-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1">Active Pathways</p>
                <p className="text-2xl font-black italic">{mockLinks.length}</p>
             </div>
          </div>

          {/* Links List */}
          <div className="space-y-4">
             {mockLinks.map(link => (
               <div key={link.id} className="frosted-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-orange-500/30 transition-all duration-500">
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-sm uppercase italic tracking-tighter group-hover:text-orange-500 transition-colors">{link.name}</h3>
                        <span className="badge-frosted badge-blue text-[8px] uppercase">{link.type}</span>
                     </div>
                     <p className="text-[10px] font-mono text-muted truncate opacity-60 italic">{link.url}?ref={link.code}</p>
                  </div>

                  <div className="flex items-center gap-8 md:px-8 border-l border-white/5">
                     <div className="text-center">
                        <p className="text-lg font-black italic">{link.clicks}</p>
                        <p className="text-[8px] font-bold text-muted uppercase tracking-widest">Clicks</p>
                     </div>
                     <div className="text-center">
                        <p className="text-lg font-black italic text-green-500">{link.conversions}</p>
                        <p className="text-[8px] font-bold text-muted uppercase tracking-widest">Sales</p>
                     </div>
                     <div className="text-center min-w-[60px]">
                        <p className="text-lg font-black italic text-orange-500">${link.earnings}</p>
                        <p className="text-[8px] font-bold text-muted uppercase tracking-widest">Payout</p>
                     </div>
                  </div>

                  <div className="flex gap-2">
                     <button className="btn-vibrant !py-1.5 !px-3 !text-[9px] uppercase tracking-widest !from-zinc-700 !to-zinc-900 border border-white/5">Copy</button>
                     <button className="btn-vibrant !py-1.5 !px-3 !text-[9px] uppercase tracking-widest">Edit</button>
                  </div>
               </div>
             ))}
          </div>

        </div>
      </main>
    </div>
  );
}
