'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/Card';
import { Button, LinkButton, CopyButton } from '@/components/Button';
import { Badge } from '@/components/Badge';

// Mock referral links
const mockLinks = [
  { id: '1', name: 'Main Website', url: 'https://thesteepircle.com', code: 'STEEPVIP1', type: 'product', clicks: 450, conversions: 38, earnings: 285.00, created: '2024-01-15' },
  { id: '2', name: 'Symptom Tool', url: 'https://thesteepircle.com/stems', code: 'STEEPVIP2', type: 'symptom-tool', clicks: 320, conversions: 28, earnings: 195.50, created: '2024-01-20' },
  { id: '3', name: 'Membership Page', url: 'https://thesteepircle.com/circle', code: 'STEEPVIP3', type: 'subscription', clicks: 180, conversions: 15, earnings: 449.85, created: '2024-02-01' },
  { id: '4', name: 'Calm Shores Blend', url: 'https://thesteepircle.com/products/calm-shores', code: 'STEEPVIP4', type: 'product', clicks: 95, conversions: 8, earnings: 40.00, created: '2024-02-10' },
];

export default function LinksPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const role: 'admin' | 'member' | 'affiliate' = 'affiliate';

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalClicks = mockLinks.reduce((sum, link) => sum + link.clicks, 0);
  const totalConversions = mockLinks.reduce((sum, link) => sum + link.conversions, 0);
  const totalEarnings = mockLinks.reduce((sum, link) => sum + link.earnings, 0);

  return (
    <div className="flex">
      <Sidebar role={role} userName="Affiliate" />
      
      <main className="main-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Referral Links</h1>
            <p className="text-neutral-600">
              Create and manage your custom referral links.
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Link
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <p className="text-sm text-neutral-500 mb-1">Total Clicks</p>
            <p className="text-3xl font-bold text-neutral-900">{totalClicks.toLocaleString()}</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-neutral-500 mb-1">Total Conversions</p>
            <p className="text-3xl font-bold text-neutral-900">{totalConversions}</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-neutral-500 mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-teal-600">${totalEarnings.toLocaleString()}</p>
          </Card>
        </div>

        {/* Links Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="text-left p-4 text-sm font-semibold text-neutral-600">Link Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-neutral-600">Type</th>
                  <th className="text-center p-4 text-sm font-semibold text-neutral-600">Clicks</th>
                  <th className="text-center p-4 text-sm font-semibold text-neutral-600">Conversions</th>
                  <th className="text-right p-4 text-sm font-semibold text-neutral-600">Earnings</th>
                  <th className="text-right p-4 text-sm font-semibold text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockLinks.map((link) => {
                  const fullUrl = `${link.url}?ref=${link.code}`;
                  return (
                    <tr key={link.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-neutral-900">{link.name}</p>
                          <p className="text-xs text-neutral-400 font-mono truncate max-w-xs">{fullUrl}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={link.type === 'subscription' ? 'primary' : link.type === 'symptom-tool' ? 'info' : 'default'}
                        >
                          {link.type === 'subscription' ? '🔄 Subscription' : 
                           link.type === 'symptom-tool' ? '🌿 Symptom Tool' : '📦 Product'}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-medium text-neutral-900">{link.clicks}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-medium text-neutral-900">{link.conversions}</span>
                        <span className="text-xs text-neutral-400 ml-1">
                          ({((link.conversions / link.clicks) * 100).toFixed(1)}%)
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="font-semibold text-teal-600">${link.earnings.toFixed(2)}</span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCopy(link.id, fullUrl)}
                          >
                            {copiedId === link.id ? (
                              <span className="text-green-600">✓ Copied</span>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                              </>
                            )}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Tips */}
        <Card className="mt-8 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
          <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            💡 Tips for Maximizing Your Referrals
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-neutral-900">Use the Symptom Tool link</p>
                <p className="text-sm text-neutral-600">It has the highest conversion rate!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-neutral-900">Share personal stories</p>
                <p className="text-sm text-neutral-600">Authentic testimonials convert better.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-neutral-900">Create custom links for campaigns</p>
                <p className="text-sm text-neutral-600">Track what works best for you.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-neutral-900">Promote subscriptions</p>
                <p className="text-sm text-neutral-600">Earn recurring commissions monthly!</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
