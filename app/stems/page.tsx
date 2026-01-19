import Link from 'next/link';
import { LinkButton } from '@/components/Button';
import { Card, FeatureCard } from '@/components/Card';

export default function StemsLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-sm mb-8 animate-fade-in">
              <span className="text-2xl">🌿</span>
              <span className="text-sm font-medium text-teal-700">Personalized Wellness Guide</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 animate-slide-up">
              Discover Your Perfect
              <span className="block text-gradient">Herbal Blend</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto animate-slide-up stagger-1">
              Tell us how you're feeling, and we'll match you with the Caribbean-inspired herbal tea 
              that's perfect for your wellness journey.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
              <LinkButton href="/stems/quiz" size="lg">
                Start Your Wellness Quiz
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </LinkButton>
              <LinkButton href="#how-it-works" variant="outline" size="lg">
                Learn More
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2>How Symptom-to-Stems Works</h2>
            <p>Three simple steps to find your perfect herbal match</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon="🎯"
              title="Tell Us How You Feel"
              description="Select the symptoms or wellness goals you want to address. Whether it's stress, sleep, energy, or more."
              className="animate-slide-up stagger-1"
            />
            <FeatureCard
              icon="🌱"
              title="Get Matched"
              description="Our algorithm analyzes your inputs and matches you with the perfect herbal blend from our Caribbean collection."
              className="animate-slide-up stagger-2"
            />
            <FeatureCard
              icon="✨"
              title="Start Your Ritual"
              description="Receive personalized brewing rituals and learn how to make the most of your herbal wellness journey."
              className="animate-slide-up stagger-3"
            />
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2>Wellness Categories</h2>
            <p>Explore our holistic approach to herbal wellness</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: '🧘', label: 'Stress Relief', color: 'from-purple-500 to-purple-600' },
              { icon: '🌙', label: 'Better Sleep', color: 'from-indigo-500 to-indigo-600' },
              { icon: '⚡', label: 'Energy Boost', color: 'from-amber-500 to-amber-600' },
              { icon: '🛡️', label: 'Immunity', color: 'from-green-500 to-green-600' },
              { icon: '🧠', label: 'Mental Focus', color: 'from-blue-500 to-blue-600' },
              { icon: '💚', label: 'Digestion', color: 'from-emerald-500 to-emerald-600' },
              { icon: '✨', label: 'Beauty', color: 'from-pink-500 to-pink-600' },
              { icon: '🍃', label: 'Detox', color: 'from-teal-500 to-teal-600' },
            ].map((category) => (
              <Link
                key={category.label}
                href="/stems/quiz"
                className="group p-6 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-neutral-900">{category.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card variant="gradient" className="text-center p-12">
              <div className="text-5xl mb-4">💫</div>
              <h2 className="text-3xl font-bold mb-4">Join Thousands of Wellness Seekers</h2>
              <p className="text-teal-100 mb-8 max-w-xl mx-auto">
                Our community has discovered their perfect herbal matches and transformed their daily wellness routines.
              </p>
              <div className="flex justify-center gap-12 mb-8">
                <div>
                  <p className="text-4xl font-bold">10K+</p>
                  <p className="text-teal-200 text-sm">Happy Members</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">8</p>
                  <p className="text-teal-200 text-sm">Unique Blends</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">98%</p>
                  <p className="text-teal-200 text-sm">Satisfaction</p>
                </div>
              </div>
              <LinkButton href="/stems/quiz" variant="secondary" size="lg">
                Find Your Blend Now
              </LinkButton>
            </Card>
          </div>
        </div>
      </section>

      {/* Affiliate CTA */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Share Wellness, Earn Rewards</h2>
            <p className="text-neutral-600 mb-8">
              Have friends who could benefit from herbal wellness? Share your personalized link and earn commissions 
              on every purchase they make.
            </p>
            <LinkButton href="/affiliate" variant="outline" size="lg">
              Become an Affiliate Partner
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-200">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-500">
          <p>© 2024 The Steep Circle. Caribbean-inspired herbal wellness.</p>
        </div>
      </footer>
    </div>
  );
}
