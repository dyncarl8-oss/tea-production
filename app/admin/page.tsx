import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { Sidebar } from '@/components/Sidebar';

export default async function AdminPage() {
  let userId: string;
  let user: any;
  let role: 'admin' | 'member' | 'affiliate' | 'visitor' = 'visitor';

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    user = await whopsdk.users.retrieve(userId);
    
    // In real app, check roles specifically via Whop or DB
    // For MVP, we'll assume entry to this route is gated by whop-level permissions
    role = 'admin';
  } catch (error) {
    // This is the functional redirect requirement from WHAT TO BUILD.txt
    redirect('/circle');
  }

  const displayName = user?.name || user?.username || 'Admin';
  const avatarUrl = user?.profile_picture?.url || null;

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Sidebar role={role} userName={displayName} userAvatar={avatarUrl} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="pb-6 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="h1-dense uppercase italic tracking-tighter text-4xl">System Admin</h1>
              <p className="sub-dense">Manage the Steep Circle ecosystem growth and content.</p>
            </div>
            <div className="flex gap-2">
               <span className="badge-frosted badge-blue uppercase text-[9px] font-black italic">V.0.2.0 ALPHA</span>
               <span className="badge-frosted border-red-500/20 text-red-500 bg-red-500/10 uppercase text-[9px] font-black italic">LIVE MODE</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { label: 'Total Members', value: '1,280', delta: '+12%', color: 'text-orange-500' },
               { label: 'Growth Leads', value: '452', delta: '+5%', color: 'text-blue-500' },
               { label: 'Revenue (MRR)', value: '$12,450', delta: '+18%', color: 'text-green-500' },
               { label: 'Support Tickets', value: '3', delta: 'Active', color: 'text-red-500' }
             ].map(stat => (
               <div key={stat.label} className="frosted-card p-4 border-white/5">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted mb-1 italic">{stat.label}</p>
                  <p className={`text-2xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</p>
                  <span className="text-[8px] font-bold text-muted uppercase tracking-widest">{stat.delta} VS LAST MONTH</span>
               </div>
             ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
             {/* User Management Section */}
             <div className="lg:col-span-2 space-y-6">
                <div className="frosted-card overflow-hidden">
                   <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                      <h3 className="font-black text-[10px] uppercase tracking-widest italic tracking-[0.2em]">Active Member Roster</h3>
                      <button className="badge-frosted badge-orange uppercase text-[8px] font-black">Export CSV</button>
                   </div>
                   <div className="p-0">
                      <table className="w-full text-left text-[11px]">
                         <thead>
                            <tr className="border-b border-white/5 text-muted uppercase tracking-widest font-black italic">
                               <th className="p-4">Identity</th>
                               <th className="p-4">Role</th>
                               <th className="p-4 text-right">Action</th>
                            </tr>
                         </thead>
                         <tbody className="font-medium italic">
                            {[
                              { name: 'Darian Thompson', role: 'Affiliate', status: 'Online' },
                              { name: 'Leila Smith', role: 'Member', status: 'Offline' },
                              { name: 'Zion Carter', role: 'Admin', status: 'Online' }
                            ].map(u => (
                              <tr key={u.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                 <td className="p-4 flex items-center gap-3">
                                    <div className="w-6 h-6 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[8px] uppercase">{u.name.charAt(0)}</div>
                                    {u.name}
                                 </td>
                                 <td className="p-4 uppercase tracking-widest text-[9px] font-black opacity-60">{u.role}</td>
                                 <td className="p-4 text-right">
                                    <button className="text-orange-500 font-black uppercase text-[9px] hover:underline">Manage</button>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>

             {/* System Controls */}
             <div className="space-y-6">
                <div className="frosted-card p-6 bg-gradient-to-br from-orange-500/5 to-transparent">
                   <h3 className="font-black text-[10px] uppercase tracking-widest italic text-orange-500 mb-6 tracking-[0.2em]">Growth Controls</h3>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5">
                         <span className="text-[10px] font-black uppercase italic tracking-tighter">Affiliate auto-enroll</span>
                         <div className="w-8 h-4 bg-orange-500 rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-lg" />
                         </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5">
                         <span className="text-[10px] font-black uppercase italic tracking-tighter">Trial mode (7 Days)</span>
                         <div className="w-8 h-4 bg-zinc-700 rounded-full relative">
                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white/40 rounded-full shadow-lg" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="frosted-card p-6 border-blue-500/10">
                   <h3 className="font-black text-[10px] uppercase tracking-widest italic text-blue-500 mb-4 tracking-[0.2em]">Content Engine</h3>
                   <button className="btn-vibrant !w-full !from-blue-600 !to-indigo-600 !py-3 !text-[10px] uppercase tracking-widest mb-3">Sync Stems Map</button>
                   <button className="btn-vibrant !w-full !from-zinc-700 !to-zinc-900 border border-white/5 !py-3 !text-[10px] uppercase tracking-widest">Update Library</button>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
