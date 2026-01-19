import Link from 'next/link';
import { LinkButton } from '@/components/Button';
import { Card, FeatureCard } from '@/components/Card';

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-6">
            <span className="text-2xl">🌿</span>
            <span className="text-sm font-medium text-teal-700">The Steep Circle</span>
          </div>
          <h1 className="text-5xl font-bold text-neutral-900 mb-6">
            Discover Herbal Wellness
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Join our Caribbean-inspired herbal wellness community. Education, community, 
            and affiliate opportunities all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon="🌱"
            title="Symptom-to-Stems Tool"
            description="Discover your perfect herbal blend based on your wellness needs. Get personalized recommendations in minutes."
          />
          <FeatureCard
            icon="🎓"
            title="The Steep Circle"
            description="Access exclusive courses, masterclasses, and a supportive community of wellness enthusiasts."
          />
          <FeatureCard
            icon="💎"
            title="Affiliate Program"
            description="Share wellness and earn. Get marketing assets, referral links, and earn commissions on every sale."
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex justify-center gap-4 mb-8">
            <LinkButton href="/stems" size="lg">
              Try the Symptom Tool
            </LinkButton>
            <LinkButton href="/circle" variant="outline" size="lg">
              Join The Circle
            </LinkButton>
          </div>
          <p className="text-sm text-neutral-500">
            Already a member? <Link href="/circle" className="text-teal-600 hover:underline">Sign in here</Link>
          </p>
        </div>

        {/* Stats */}
        <div className="mt-20">
          <Card variant="gradient" className="text-center">
            <h2 className="text-2xl font-bold mb-8">Join Thousands of Wellness Seekers</h2>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold">10K+</p>
                <p className="text-teal-100">Happy Members</p>
              </div>
              <div>
                <p className="text-4xl font-bold">8</p>
                <p className="text-teal-100">Unique Blends</p>
              </div>
              <div>
                <p className="text-4xl font-bold">$50K+</p>
                <p className="text-teal-100">Affiliate Payouts</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
