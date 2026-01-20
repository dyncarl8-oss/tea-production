import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { marketingAssets, campaigns } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';

export default async function AssetsPage() {
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

  // Group assets by category
  const assetsByCategory = marketingAssets.reduce((acc, asset) => {
    if (!acc[asset.category]) {
      acc[asset.category] = [];
    }
    acc[asset.category].push(asset);
    return acc;
  }, {} as Record<string, typeof marketingAssets>);

  const categoryIcons: Record<string, string> = {
    'Product Photos': '📸',
    'Social Media': '📱',
    'Copy & Content': '✍️',
    'Brand Assets': '🎨',
    'Videos': '🎬',
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Sidebar role={role} userName={displayName} userAvatar={avatarUrl} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="pb-6 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="h1-dense uppercase italic tracking-tighter">Marketing Assets</h1>
              <p className="sub-dense">High-converting materials for your wellness campaigns.</p>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="grid md:grid-cols-2 gap-6">
             {campaigns.filter(c => c.isActive).map(campaign => (
               <div key={campaign.id} className="frosted-card p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <span className="badge-frosted badge-orange uppercase text-[9px] font-black italic mb-2">Active Campaign</span>
                        <h2 className="text-xl font-black italic uppercase tracking-tighter">{campaign.name}</h2>
                     </div>
                     <div className="text-right">
                        <p className="text-3xl font-black italic text-orange-500">+{campaign.bonusRate}%</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Bonus</p>
                     </div>
                  </div>
                  <p className="text-[11px] font-medium text-muted leading-relaxed mb-6">{campaign.description}</p>
                  <button className="btn-vibrant !w-full !text-[10px] uppercase tracking-widest">Get Campaign Assets</button>
               </div>
             ))}
          </div>

          {/* Asset Categories */}
          <div className="space-y-12">
            {Object.entries(assetsByCategory).map(([category, assets]) => (
              <section key={category} className="space-y-6">
                <div className="flex items-center gap-3">
                   <h2 className="h2-dense uppercase italic tracking-tight flex items-center gap-2">
                      <span className="opacity-60">{categoryIcons[category] || '📁'}</span>
                      {category}
                   </h2>
                   <div className="flex-1 h-[1px] bg-white/5" />
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assets.map((asset) => (
                    <div key={asset.id} className="frosted-card group overflow-hidden flex flex-col hover:border-orange-500/30 transition-all duration-500 cursor-pointer">
                      <div className="aspect-video bg-white/5 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                        <span className="text-5xl group-hover:scale-125 transition-transform duration-700 opacity-60">
                           {asset.type === 'image' ? '🖼️' : asset.type === 'video' ? '🎬' : '🎨'}
                        </span>
                        <div className="absolute top-3 left-3">
                           <span className="badge-frosted badge-blue uppercase text-[8px] font-black">{asset.type}</span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-black text-sm uppercase italic tracking-tighter mb-2 group-hover:text-orange-500 transition-colors">
                          {asset.name}
                        </h3>
                        <p className="text-[10px] text-muted line-clamp-2 mb-4 leading-normal font-medium italic">
                          {asset.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                           <span className="text-[9px] font-bold text-muted/50 uppercase tracking-widest">{asset.downloads} Direct DLs</span>
                           <button className="btn-vibrant !py-1 !px-3 !text-[9px] uppercase tracking-widest !from-blue-500 !to-indigo-600 shadow-blue-500/20">Download</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
