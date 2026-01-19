import { headers } from 'next/headers';
import { whopsdk } from '@/lib/whop-sdk';
import { courses, commissionSettings } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';
import { Card, StatCard } from '@/components/Card';
import { LinkButton, Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Progress } from '@/components/Progress';

export default async function AdminDashboard() {
  let userId: string;
  let user: any;
  const role: 'admin' | 'member' | 'affiliate' = 'admin';

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    user = await whopsdk.users.retrieve(userId);
  } catch (error) {
    userId = 'admin-user';
    user = { name: 'Admin', username: 'admin' };
  }

  const displayName = user?.name || `@${user?.username}` || 'Admin';

  // Mock admin stats
  const stats = {
    totalUsers: 1247,
    totalMembers: 856,
    totalAffiliates: 124,
    newUsersThisWeek: 47,
    totalRevenue: 45680.00,
    revenueThisMonth: 12450.00,
    activeSubscriptions: 743,
    totalCourses: courses.length,
    totalLessons: 45,
    avgCompletionRate: 67,
    affiliatePayouts: 3250.00,
    pendingPayouts: 890.00,
  };

  // Mock recent activity
  const recentActivity = [
    { id: '1', type: 'signup', message: 'New member: Sarah M.', time: '2 min ago', icon: '👤' },
    { id: '2', type: 'purchase', message: 'Product sold: Calm Shores Blend', time: '5 min ago', icon: '💰' },
    { id: '3', type: 'affiliate', message: 'New affiliate signup: James T.', time: '15 min ago', icon: '💎' },
    { id: '4', type: 'subscription', message: 'New subscription: Lisa R.', time: '32 min ago', icon: '🔄' },
    { id: '5', type: 'completion', message: 'Course completed: Herbal Foundations', time: '1 hour ago', icon: '🎓' },
    { id: '6', type: 'payout', message: 'Affiliate payout processed: $450', time: '2 hours ago', icon: '💳' },
  ];

  return (
    <div className="flex">
      <Sidebar role={role} userName={displayName} />
      
      <main className="main-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Admin Dashboard 🔧
            </h1>
            <p className="text-neutral-600">
              Monitor your platform, manage users, and track revenue.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Export Data
            </Button>
            <Button>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Content
            </Button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            change={{ value: 18, type: 'increase' }}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Active Members"
            value={stats.totalMembers.toLocaleString()}
            change={{ value: 12, type: 'increase' }}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Active Affiliates"
            value={stats.totalAffiliates}
            change={{ value: 8, type: 'increase' }}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
          <StatCard
            title="Completion Rate"
            value={`${stats.avgCompletionRate}%`}
            change={{ value: 5, type: 'increase' }}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Overview */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900">Revenue Overview</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Week</Button>
                  <Button variant="secondary" size="sm">Month</Button>
                  <Button variant="ghost" size="sm">Year</Button>
                </div>
              </div>
              
              {/* Mock Chart Placeholder */}
              <div className="h-64 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-neutral-500">Revenue Chart</p>
                  <p className="text-2xl font-bold text-teal-600 mt-2">${stats.revenueThisMonth.toLocaleString()}</p>
                  <p className="text-sm text-neutral-400">This month</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <p className="text-sm text-neutral-500 mb-1">Products</p>
                  <p className="text-xl font-bold text-neutral-900">$5,240</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <p className="text-sm text-neutral-500 mb-1">Subscriptions</p>
                  <p className="text-xl font-bold text-neutral-900">$6,890</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <p className="text-sm text-neutral-500 mb-1">Affiliate Payouts</p>
                  <p className="text-xl font-bold text-red-500">-$320</p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <LinkButton href="/admin/users" variant="secondary" className="flex-col h-24 gap-2">
                <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm">Manage Users</span>
              </LinkButton>
              <LinkButton href="/admin/content" variant="secondary" className="flex-col h-24 gap-2">
                <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm">Content</span>
              </LinkButton>
              <LinkButton href="/admin/stems" variant="secondary" className="flex-col h-24 gap-2">
                <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm">Stems Mappings</span>
              </LinkButton>
              <LinkButton href="/admin/commissions" variant="secondary" className="flex-col h-24 gap-2">
                <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Commissions</span>
              </LinkButton>
            </div>

            {/* Content Stats */}
            <Card>
              <h2 className="text-lg font-semibold text-neutral-900 mb-6">Content Performance</h2>
              <div className="space-y-4">
                {courses.slice(0, 4).map((course, idx) => (
                  <div key={course.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-xl">
                      {idx === 0 ? '🌿' : idx === 1 ? '☀️' : idx === 2 ? '💼' : '🎓'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 truncate">{course.title}</p>
                      <p className="text-sm text-neutral-500">{course.lessonCount} lessons</p>
                    </div>
                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-400">Completion</span>
                        <span className="font-medium">{70 - idx * 15}%</span>
                      </div>
                      <Progress value={70 - idx * 15} size="sm" />
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-neutral-900">{245 - idx * 30}</p>
                      <p className="text-xs text-neutral-400">enrollments</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4">Recent Activity</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-900 truncate">{activity.message}</p>
                      <p className="text-xs text-neutral-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Affiliate Payouts */}
            <Card className="bg-amber-50 border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                <span>💳</span> Pending Payouts
              </h3>
              <div className="text-3xl font-bold text-amber-800 mb-2">
                ${stats.pendingPayouts.toLocaleString()}
              </div>
              <p className="text-sm text-amber-700 mb-4">
                12 affiliates pending payout
              </p>
              <Button variant="outline" fullWidth>
                Process Payouts
              </Button>
            </Card>

            {/* Commission Settings */}
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4">Commission Settings</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="text-sm text-neutral-600">Product Rate</span>
                  <Badge variant="primary">{commissionSettings.productCommissionRate}%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="text-sm text-neutral-600">Subscription Rate</span>
                  <Badge variant="primary">{commissionSettings.subscriptionCommissionRate}%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="text-sm text-neutral-600">Min Payout</span>
                  <Badge variant="default">${commissionSettings.minimumPayout}</Badge>
                </div>
              </div>
              <LinkButton href="/admin/commissions" variant="ghost" size="sm" fullWidth className="mt-4">
                Edit Settings
              </LinkButton>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
