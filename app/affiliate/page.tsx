import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { Sidebar } from '@/components/Sidebar';
import { Card, StatCard } from '@/components/Card';
import { LinkButton } from '@/components/Button';
import { Badge } from '@/components/Badge';

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
    
    // In real app, check affiliate resource access here
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
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar 
        role={role} 
        userName={displayName} 
        userAvatar={avatarUrl}
      />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Affiliate Dashboard 💎</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Track your earnings and grow your wellness business.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="warning" size="lg" dot>
                 Gold Partner
              </Badge>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Earnings"
              value={`$${stats.earnings.toLocaleString()}`}
              icon={<DollarIcon />}
            />
            <StatCard
              title="This Month"
              value="$520"
              change={{ value: 24, type: 'increase' }}
              icon={<TrendingUpIcon />}
            />
             <StatCard
              title="Total Referrals"
              value={stats.referrals}
              icon={<UsersIcon />}
            />
            <StatCard
              title="Conversion Rate"
              value={`${stats.conversionRate}%`}
              icon={<ChartBarIcon />}
            />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left Col - Links & Assets */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
                 <h3 className="font-semibold text-foreground mb-4">Your Referral Links</h3>
                 <div className="space-y-4">
                   <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
                     <div className="min-w-0">
                       <p className="text-sm font-medium text-foreground">Default Store Link</p>
                       <p className="text-xs text-neutral-500 truncate">thesteepcircle.com/ref/{user?.username || 'partner'}</p>
                     </div>
                     <LinkButton href="#" variant="secondary" size="sm">Copy</LinkButton>
                   </div>
                 </div>
               </div>
            </div>

            {/* Right Col - Recent Activity */}
            <div className="space-y-6">
              <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Recent Referrals</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center font-bold">
                          $
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Commission Earned</p>
                          <p className="text-xs text-neutral-500">Product Sale</p>
                        </div>
                      </div>
                      <span className="font-medium text-green-600 dark:text-green-400">+$15.00</span>
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

// Icons
function DollarIcon() { return <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function TrendingUpIcon() { return <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>; }
function UsersIcon() { return <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>; }
function ChartBarIcon() { return <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>; }
