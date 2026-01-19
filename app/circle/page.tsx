import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { courses, lessons } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';
import { Card, StatCard } from '@/components/Card';
import { LinkButton } from '@/components/Button';
import { Progress, CircularProgress } from '@/components/Progress';
import { Badge } from '@/components/Badge';

export default async function CircleDashboard() {
  // Verify user authentication
  let userId: string;
  let user: any;
  let role: 'admin' | 'member' | 'affiliate' = 'member';

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    user = await whopsdk.users.retrieve(userId);
  } catch (error) {
    // For development, use mock data
    userId = 'mock-user';
    user = { name: 'Wellness Seeker', username: 'wellness_seeker' };
  }

  const displayName = user?.name || `@${user?.username}` || 'Member';

  // Mock progress data
  const mockProgress = {
    coursesCompleted: 1,
    totalCourses: courses.length,
    lessonsCompleted: 5,
    totalLessons: lessons.length + 20,
    streakDays: 7,
    totalWatchTime: 145, // minutes
  };

  // Get recent/in-progress courses
  const recentCourses = courses.slice(0, 3);

  // Get recommended lessons
  const recommendedLessons = lessons.slice(0, 3);

  return (
    <div className="flex">
      <Sidebar role={role} userName={displayName} />
      
      <main className="main-content">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Welcome back, {displayName}! 🌿
              </h1>
              <p className="text-neutral-600">
                Continue your herbal wellness journey where you left off.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="success" dot>
                {mockProgress.streakDays} Day Streak
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Courses Completed"
            value={`${mockProgress.coursesCompleted}/${mockProgress.totalCourses}`}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <StatCard
            title="Lessons Done"
            value={mockProgress.lessonsCompleted}
            change={{ value: 12, type: 'increase' }}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Watch Time"
            value={`${Math.floor(mockProgress.totalWatchTime / 60)}h ${mockProgress.totalWatchTime % 60}m`}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Current Streak"
            value={`${mockProgress.streakDays} Days`}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            }
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Continue Learning */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Where You Left Off */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">Continue Learning</h2>
                <LinkButton href="/circle/courses" variant="ghost" size="sm">
                  View All Courses
                </LinkButton>
              </div>
              
              <div className="space-y-4">
                {recentCourses.map((course, idx) => (
                  <Card key={course.id} className="group" hover>
                    <div className="flex gap-6">
                      <div className="w-32 h-24 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-105 transition-transform">
                        {idx === 0 ? '🌿' : idx === 1 ? '☀️' : '💼'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-neutral-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-neutral-500 truncate-2">{course.description}</p>
                          </div>
                          <CircularProgress 
                            value={idx === 0 ? 65 : idx === 1 ? 30 : 0} 
                            size={56}
                            strokeWidth={6}
                          />
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-neutral-400">
                            {course.lessonCount} lessons • {course.duration} min
                          </span>
                          <Badge variant={course.difficulty === 'beginner' ? 'success' : course.difficulty === 'intermediate' ? 'warning' : 'danger'} size="sm">
                            {course.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recommended Lessons */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">Up Next For You</h2>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {recommendedLessons.map((lesson) => (
                  <Card key={lesson.id} className="group cursor-pointer" padding="sm">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center mb-3 group-hover:from-teal-50 group-hover:to-emerald-50 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-teal-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-medium text-neutral-900 text-sm mb-1 truncate">{lesson.title}</h4>
                    <p className="text-xs text-neutral-500">{lesson.duration} min</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-6">
            {/* Overall Progress */}
            <Card className="text-center">
              <h3 className="font-semibold text-neutral-900 mb-4">Your Progress</h3>
              <CircularProgress 
                value={mockProgress.lessonsCompleted} 
                max={mockProgress.totalLessons}
                size={120}
                strokeWidth={12}
                label="Complete"
              />
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Herbal Foundations</span>
                    <span className="font-medium text-neutral-700">65%</span>
                  </div>
                  <Progress value={65} size="sm" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Morning Rituals</span>
                    <span className="font-medium text-neutral-700">30%</span>
                  </div>
                  <Progress value={30} size="sm" />
                </div>
              </div>
            </Card>

            {/* Community Highlights */}
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <span>👥</span> Community
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                  <div className="avatar">M</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">Maya completed Herbal Foundations!</p>
                    <p className="text-xs text-neutral-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                  <div className="avatar">J</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">Jordan started a 30-day challenge</p>
                    <p className="text-xs text-neutral-500">5 hours ago</p>
                  </div>
                </div>
              </div>
              <LinkButton href="/circle/community" variant="ghost" size="sm" fullWidth className="mt-4">
                View Community
              </LinkButton>
            </Card>

            {/* Affiliate CTA */}
            <Card variant="gradient" className="text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-semibold mb-2">Become an Affiliate</h3>
              <p className="text-teal-100 text-sm mb-4">
                Share what you're learning and earn commissions!
              </p>
              <LinkButton href="/affiliate" variant="secondary" size="sm" fullWidth>
                Learn More
              </LinkButton>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
