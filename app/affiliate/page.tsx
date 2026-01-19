import { headers } from 'next/headers';
import { whopsdk } from '@/lib/whop-sdk';
import { commissionSettings } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';
import { Card, StatCard } from '@/components/Card';
import { LinkButton, CopyButton } from '@/components/Button';
import { Badge, StatusBadge } from '@/components/Badge';
import { Progress } from '@/components/Progress';

export default async function AffiliateDashboard() {
  let userId: string;
  let user: any;
  const role: 'admin' | 'member' | 'affiliate' = 'affiliate';

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    user = await whopsdk.users.retrieve(userId);
  } catch (error) {
    userId = 'mock-user';
    user = { name: 'Wellness Affiliate', username: 'wellness_affiliate' };
  }

  const displayName = user?.name || `@${user?.username}` || 'Affiliate';

  // Mock affiliate stats
  const stats = {
    totalEarnings: 2450.00,
    pendingEarnings: 320.00,
    paidEarnings: 2130.00,
    totalReferrals: 47,
    activeReferrals: 32,
    conversionRate: 8.5,
    clicksThisMonth: 1250,
    commissionsThisMonth: 520.00,
    rank: 12,
    tier: 'Gold',
  };

  // Mock recent commissions
  const recentCommissions = [
    { id: '1', type: 'subscription', amount: 29.99, status: 'approved', customer: 'Sarah M.', product: 'Steep Circle Membership', date: '2 hours ago' },
    { id: '2', type: 'product', amount: 12.50, status: 'pending', customer: 'James T.', product: 'Calm Shores Blend', date: '5 hours ago' },
    { id: '3', type: 'subscription', amount: 29.99, status: 'approved', customer: 'Lisa R.', product: 'Steep Circle Membership', date: '1 day ago' },
    { id: '4', type: 'product', amount: 8.75, status: 'paid', customer: 'Mike D.', product: 'Dream Tide Blend', date: '2 days ago' },
    { id: '5', type: 'product', amount: 15.00, status: 'paid', customer: 'Emma S.', product: 'Island Vitality Bundle', date: '3 days ago' },
  ];

  // Affiliate code
  const affiliateCode = 'STEEP' + userId.slice(-4).toUpperCase() + 'VIP';
  const referralLink = `https://thesteepircle.com?ref=${affiliateCode}`;

  return (
    <div className="flex">
      <Sidebar role={role} userName={displayName} />
      
      <main className="main-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Affiliate Dashboard 💎
            </h1>
            <p className="text-neutral-600">
              Track your earnings, manage links, and grow your wellness business.
            </p>
          </div>
          <Badge variant="warning" className="text-base px-4 py-2">
            🏆 {stats.tier} Partner
          </Badge>
        </div>

        {/* Quick Share Card */}
        <Card className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white mb-8" padding="lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Referral Link</h2>
              <p className="text-teal-100 text-sm">
                Share this link to earn {commissionSettings.productCommissionRate}% on products and {commissionSettings.subscriptionCommissionRate}% on subscriptions!
              </p>
            </div>
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur rounded-xl p-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 bg-transparent text-white px-3 py-2 text-sm outline-none"
                />
                <CopyButton text={referralLink} className="text-white hover:bg-white/20" />
              </div>
              <p className="text-xs text-teal-200 mt-2">Your code: {affiliateCode}</p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Earnings"
            value={`$${stats.totalEarnings.toLocaleString()}`}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="This Month"
            value={`$${stats.commissionsThisMonth.toLocaleString()}`}
            change={{ value: 24, type: 'increase' }}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
          <StatCard
            title="Total Referrals"
            value={stats.totalReferrals}
            change={{ value: 12, type: 'increase' }}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Earnings & Commissions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Breakdown */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">Earnings Breakdown</h2>
                <LinkButton href="/affiliate/analytics" variant="ghost" size="sm">
                  View Details
                </LinkButton>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-600 mb-1">Available for Payout</p>
                  <p className="text-2xl font-bold text-green-700">${stats.pendingEarnings.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-sm text-neutral-500 mb-1">Processing</p>
                  <p className="text-2xl font-bold text-neutral-700">$0.00</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl">
                  <p className="text-sm text-teal-600 mb-1">Paid Out</p>
                  <p className="text-2xl font-bold text-teal-700">${stats.paidEarnings.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-neutral-500">Next payout in</span>
                  <span className="text-sm font-medium text-neutral-900">12 days</span>
                </div>
                <Progress value={60} size="sm" />
                <p className="text-xs text-neutral-400 mt-2">
                  Minimum payout: ${commissionSettings.minimumPayout} • Payout frequency: {commissionSettings.payoutFrequency}
                </p>
              </div>
            </Card>

            {/* Recent Commissions */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">Recent Commissions</h2>
                <LinkButton href="/affiliate/analytics" variant="ghost" size="sm">
                  View All
                </LinkButton>
              </div>
              
              <div className="space-y-4">
                {recentCommissions.map((commission) => (
                  <div 
                    key={commission.id}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        commission.type === 'subscription' ? 'bg-purple-100 text-purple-600' : 'bg-teal-100 text-teal-600'
                      }`}>
                        {commission.type === 'subscription' ? '🔄' : '📦'}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{commission.product}</p>
                        <p className="text-sm text-neutral-500">
                          {commission.customer} • {commission.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-neutral-900">+${commission.amount}</p>
                      <StatusBadge status={commission.status as any} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Leaderboard Position */}
            <Card className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Leaderboard Rank</h3>
              <p className="text-3xl font-bold text-teal-600 mb-2">#{stats.rank}</p>
              <p className="text-sm text-neutral-500 mb-4">Top 15% of affiliates</p>
              <LinkButton href="/affiliate/leaderboard" variant="outline" size="sm" fullWidth>
                View Leaderboard
              </LinkButton>
            </Card>

            {/* Quick Links */}
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <LinkButton href="/affiliate/links" variant="ghost" fullWidth className="justify-start">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Manage My Links
                </LinkButton>
                <LinkButton href="/affiliate/assets" variant="ghost" fullWidth className="justify-start">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Download Assets
                </LinkButton>
                <LinkButton href="/affiliate/analytics" variant="ghost" fullWidth className="justify-start">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Analytics
                </LinkButton>
              </div>
            </Card>

            {/* Commission Rates */}
            <Card className="bg-amber-50 border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                <span>📊</span> Your Commission Rates
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-800">Products</span>
                  <Badge variant="warning">{commissionSettings.productCommissionRate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-800">Subscriptions</span>
                  <Badge variant="warning">{commissionSettings.subscriptionCommissionRate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-800">Recurring</span>
                  <Badge variant="success">Yes</Badge>
                </div>
              </div>
              <p className="text-xs text-amber-700 mt-4">
                💡 Gold tier affiliates earn bonus rates on all sales!
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
