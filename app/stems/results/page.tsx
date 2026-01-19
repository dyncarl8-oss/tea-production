import { Suspense } from 'react';
import { getBlendsForSymptoms, getSymptomById } from '@/lib/data';
import { LinkButton, CopyButton } from '@/components/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Badge } from '@/components/Badge';

interface ResultsPageProps {
  searchParams: Promise<{ s?: string | string[] }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <ResultsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ResultsContent({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const symptomIds = Array.isArray(params.s) ? params.s : params.s ? [params.s] : [];
  
  // Get recommended blends based on symptoms
  const recommendedBlends = getBlendsForSymptoms(symptomIds);
  const selectedSymptoms = symptomIds.map(id => getSymptomById(id)).filter(Boolean);

  // Generate a shareable referral link (mock affiliate code)
  const affiliateCode = 'GUEST' + Math.random().toString(36).substring(2, 6).toUpperCase();
  const shareUrl = `https://thesteepircle.com/stems?ref=${affiliateCode}`;

  if (recommendedBlends.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🍵</div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">No Results Found</h1>
          <p className="text-neutral-600 mb-6">We couldn't find blends matching your selection.</p>
          <LinkButton href="/stems/quiz">Try Again</LinkButton>
        </div>
      </div>
    );
  }

  const primaryBlend = recommendedBlends[0];
  const alternativeBlends = recommendedBlends.slice(1, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <LinkButton href="/stems/quiz" variant="ghost" className="mb-6">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Quiz
          </LinkButton>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-4">
              <span>✨</span>
              <span className="text-sm font-medium text-teal-700">Your Personalized Results</span>
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              We Found Your Perfect Match!
            </h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Based on your responses about {selectedSymptoms.map(s => s?.name).join(', ')}, 
              here's the herbal blend that's ideal for your wellness journey.
            </p>
          </div>
        </div>

        {/* Primary Recommendation */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="overflow-hidden border-2 border-teal-200" padding="none">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white text-center">
              <Badge variant="warning" className="mb-2">🏆 Top Recommendation</Badge>
              <h2 className="text-2xl font-bold">{primaryBlend.name}</h2>
              <p className="text-teal-100">{primaryBlend.tagline}</p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <div className="aspect-square bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-8xl">🍵</span>
                  </div>
                  <p className="text-neutral-600 mb-6">{primaryBlend.description}</p>
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl mb-4">
                    <span className="text-sm text-neutral-500">Price</span>
                    <span className="text-2xl font-bold text-neutral-900">${primaryBlend.price}</span>
                  </div>
                  <LinkButton href={primaryBlend.productUrl} size="lg" fullWidth external>
                    Order Now
                  </LinkButton>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Benefits */}
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                      <span>💫</span> Benefits
                    </h3>
                    <ul className="space-y-2">
                      {primaryBlend.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-neutral-600">
                          <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                      <span>🌿</span> Key Ingredients
                    </h3>
                    <div className="space-y-2">
                      {primaryBlend.ingredients.map((ingredient, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                          <div>
                            <span className="font-medium text-neutral-900">{ingredient.name}</span>
                            {ingredient.origin && (
                              <span className="text-xs text-neutral-400 ml-2">from {ingredient.origin}</span>
                            )}
                          </div>
                          <span className="text-sm text-neutral-500">{ingredient.benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rituals */}
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                      <span>🫖</span> Brewing Rituals
                    </h3>
                    <div className="space-y-2">
                      {primaryBlend.rituals.map((ritual, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-neutral-600">
                          <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-semibold">
                            {idx + 1}
                          </span>
                          {ritual}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Alternative Recommendations */}
        {alternativeBlends.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Also Great For You</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {alternativeBlends.map((blend) => (
                <Card key={blend.id} className="group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        🍵
                      </div>
                      <div>
                        <CardTitle>{blend.name}</CardTitle>
                        <p className="text-sm text-neutral-500">{blend.tagline}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 text-sm mb-4 truncate-3">{blend.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">${blend.price}</span>
                      <LinkButton href={blend.productUrl} variant="outline" size="sm" external>
                        View Details
                      </LinkButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <div className="text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Share With Friends</h3>
              <p className="text-neutral-600 mb-6">
                Know someone who could benefit from herbal wellness? Share this tool and help them 
                find their perfect blend!
              </p>
              <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-amber-200 max-w-md mx-auto">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-transparent text-sm text-neutral-600 outline-none"
                />
                <CopyButton text={shareUrl} />
              </div>
              <p className="text-xs text-neutral-500 mt-3">
                Become an affiliate member to earn commissions on referrals!
              </p>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">
            Ready to Transform Your Wellness Routine?
          </h3>
          <p className="text-neutral-600 mb-6">
            Join The Steep Circle for exclusive courses, community access, and affiliate opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <LinkButton href="/circle" size="lg">
              Join The Steep Circle
            </LinkButton>
            <LinkButton href="/stems/quiz" variant="outline" size="lg">
              Retake Quiz
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-teal-200" />
          <div className="h-6 w-48 mx-auto mb-3 rounded bg-neutral-200" />
          <div className="h-4 w-64 mx-auto rounded bg-neutral-100" />
        </div>
        <p className="text-neutral-500 mt-6">Finding your perfect blend...</p>
      </div>
    </div>
  );
}
