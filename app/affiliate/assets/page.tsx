import { marketingAssets, campaigns } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/Card';
import { Button, LinkButton } from '@/components/Button';
import { Badge } from '@/components/Badge';

export default function AssetsPage() {
  const role: 'admin' | 'member' | 'affiliate' = 'affiliate';

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
    <div className="flex">
      <Sidebar role={role} userName="Affiliate" />
      
      <main className="main-content">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Marketing Assets</h1>
          <p className="text-neutral-600">
            Download ready-to-use marketing materials to promote The Steep Circle.
          </p>
        </div>

        {/* Active Campaign Banner */}
        {campaigns.filter(c => c.isActive).map((campaign) => (
          <Card 
            key={campaign.id} 
            className="mb-8 bg-gradient-to-r from-amber-400 to-orange-400 text-white"
            padding="lg"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Badge variant="warning" className="bg-white/20 text-white mb-2">🔥 Active Campaign</Badge>
                <h2 className="text-2xl font-bold mb-1">{campaign.name}</h2>
                <p className="text-amber-100">{campaign.description}</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-4xl font-bold">+{campaign.bonusRate}%</p>
                <p className="text-amber-100 text-sm">Bonus Commission</p>
              </div>
            </div>
          </Card>
        ))}

        {/* Asset Categories */}
        <div className="space-y-12">
          {Object.entries(assetsByCategory).map(([category, assets]) => (
            <section key={category}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{categoryIcons[category] || '📁'}</span>
                <h2 className="text-xl font-semibold text-neutral-900">{category}</h2>
                <Badge variant="default">{assets.length} items</Badge>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset) => (
                  <Card key={asset.id} className="group" padding="none">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-50 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl group-hover:scale-110 transition-transform">
                          {asset.type === 'image' ? '🖼️' :
                           asset.type === 'video' ? '🎬' :
                           asset.type === 'template' ? '📐' :
                           asset.type === 'caption' ? '📝' :
                           asset.type === 'brand-kit' ? '🎨' : '📁'}
                        </span>
                      </div>
                      
                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge 
                          variant={
                            asset.type === 'video' ? 'danger' :
                            asset.type === 'image' ? 'info' :
                            asset.type === 'template' ? 'primary' :
                            'default'
                          }
                        >
                          {asset.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-neutral-900 mb-2">{asset.name}</h3>
                      <p className="text-sm text-neutral-500 mb-4 truncate-2">{asset.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400">
                          {asset.downloads.toLocaleString()} downloads
                        </span>
                        <Button variant="primary" size="sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Copy-Paste Captions Section */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">📝 Copy-Paste Captions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'For Instagram',
                icon: '📸',
                caption: `🌿 Discovered my new wellness obsession! 

The @thesteepircle blends have completely transformed my morning routine. ✨

If you're looking to reduce stress naturally, try the Calm Shores blend - it's like a spa day in a cup! 🍵

Use my link for a special discount → [your link]

#HerbalWellness #NaturalLiving #TeaTime #Wellness #SelfCare`,
              },
              {
                title: 'For Twitter/X',
                icon: '🐦',
                caption: `tired of feeling stressed? 🫠

been using these caribbean herbal blends for a month and wow...

actually sleeping better, feeling calmer throughout the day

link in bio if you want to try → (your ref link) 🌿`,
              },
              {
                title: 'For Facebook',
                icon: '👥',
                caption: `Hey everyone! I've been getting questions about what I've been doing differently lately...

The answer? I've been incorporating herbal wellness into my daily routine with The Steep Circle blends.

These aren't just teas - they're complete wellness rituals. 🌿

Whether you need help with sleep, stress, energy, or focus - there's a blend for that!

Check them out here: [your link]`,
              },
              {
                title: 'For Stories',
                icon: '📱',
                caption: `POV: You found the best herbal blends ever 🍵✨

Swipe up to get yours → [your link]

Use code [your code] for 10% off!`,
              },
            ].map((item, idx) => (
              <Card key={idx}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                </div>
                <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                  <pre className="whitespace-pre-wrap text-sm text-neutral-600 font-sans">
                    {item.caption}
                  </pre>
                </div>
                <Button variant="outline" size="sm" fullWidth>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Caption
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Request Assets */}
        <Card className="mt-12 text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Need Custom Assets?</h3>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            If you need specific marketing materials for your audience, let us know! 
            Gold and Platinum tier affiliates get priority custom content.
          </p>
          <Button variant="outline">Request Custom Assets</Button>
        </Card>
      </main>
    </div>
  );
}
