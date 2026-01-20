import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { Sidebar } from '@/components/Sidebar';

export default async function CommunityPage() {
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
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <div>
              <h1 className="h1-dense uppercase italic tracking-tighter">Inner Circle Community</h1>
              <p className="sub-dense">Connect, Share, and Grow with fellow herbalists.</p>
            </div>
            <button className="btn-vibrant">New Post</button>
          </div>

          <div className="frosted-card p-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-6xl animate-bounce">🔥</div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">Gathering the Tribe...</h2>
            <p className="text-muted max-w-sm">
              The Digital Hearth is being prepared. Real-time community discussions and herb-shares are launching shortly.
            </p>
            <div className="flex gap-2">
               <span className="badge-frosted badge-orange">COMING SOON</span>
               <span className="badge-frosted badge-blue">Q1 2026</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
