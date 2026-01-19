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
  // 1. Verify User Authentication (Server-Side)
  let userId: string;
  let user: any;
  let role: 'admin' | 'member' | 'affiliate' | 'visitor' = 'visitor'; // Default to visitor

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    
    // Fetch full user profile (including avatar)
    user = await whopsdk.users.retrieve(userId);

    console.log(`[CIRCLE] Auth Verified - UserID: ${userId} | Name: ${user.name || user.username}`);

    // Determine Role
    // In a real app, you'd check specific resource access here. 
    // For now, we assume if they passed verifyUserToken, they are at least a member.
    role = 'member';

  } catch (error) {
    console.error('[CIRCLE] Auth Failed:', error);
    redirect('/stems'); // Redirect to public page if not authenticated
  }

  const displayName = user?.name || user?.username || 'Member';
  const avatarUrl = user?.profile_picture?.url || null;

  // Mock progress data
  const mockProgress = {
    coursesCompleted: 1,
    totalCourses: courses.length,
    lessonsCompleted: 5,
    totalLessons: lessons.length + 20,
    streakDays: 7,
    totalWatchTime: 145, // minutes
  };

  const recentCourses = courses.slice(0, 3);
  const recommendedLessons = lessons.slice(0, 3);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar 
        role={role} 
        userName={displayName} 
        userAvatar={avatarUrl} 
      />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Dashboard Header - Dense & Functional */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Performance overview for {displayName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-md border border-green-500/20 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {mockProgress.streakDays} Day Streak
              </div>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Courses Completed"
              value={`${mockProgress.coursesCompleted}/${mockProgress.totalCourses}`}
              icon={<BookIcon />}
            />
            <StatCard
              title="Lessons Done"
              value={mockProgress.lessonsCompleted}
              change={{ value: 12, type: 'increase' }}
              icon={<CheckCircleIcon />}
            />
            <StatCard
              title="Watch Time"
              value={`${Math.floor(mockProgress.totalWatchTime / 60)}h ${mockProgress.totalWatchTime % 60}m`}
              icon={<ClockIcon />}
            />
            <StatCard
              title="Current Streak"
              value={`${mockProgress.streakDays} Days`}
              icon={<FireIcon />}
            />
          </div>

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left Column - Active Learning */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Recent Courses Table-like View */}
              <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-neutral-50/50 dark:bg-neutral-900/50">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Recent Courses</h3>
                  <LinkButton href="/circle/courses" variant="ghost" size="sm" className="text-xs">
                    View All
                  </LinkButton>
                </div>
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {recentCourses.map((course, idx) => (
                    <div key={course.id} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-2xl flex-shrink-0">
                        {idx === 0 ? '🌿' : idx === 1 ? '☀️' : '💼'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground truncate">{course.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          <span>{course.lessonCount} lessons</span>
                          <span>•</span>
                          <span>{course.duration} min</span>
                          <span>•</span>
                          <span className={`${course.difficulty === 'beginner' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                            {course.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="w-24 flex-shrink-0 flex items-center justify-end">
                         {idx === 0 ? (
                           <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100">65%</span>
                         ) : (
                           <LinkButton href={`/circle/courses/${course.id}`} size="sm" variant="secondary">
                             Start
                           </LinkButton>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Lessons Grid */}
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4 px-1">Recommended</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {recommendedLessons.map((lesson) => (
                    <Card key={lesson.id} className="group cursor-pointer hover:border-primary-500/50 transition-all" padding="sm">
                      <div className="flex items-start justify-between mb-3">
                         <div className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                           <PlayIcon className="w-4 h-4" />
                         </div>
                         <span className="text-xs font-mono text-neutral-400">{lesson.duration}m</span>
                      </div>
                      <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary-500 transition-colors">{lesson.title}</h4>
                    </Card>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Brief & Community */}
            <div className="space-y-6">
              
              {/* Progress Summary */}
              <Card className="flex flex-col items-center p-6 bg-gradient-to-b from-transparent to-neutral-50/50 dark:to-neutral-900/50">
                <div className="relative mb-4">
                  <CircularProgress 
                    value={mockProgress.lessonsCompleted} 
                    max={mockProgress.totalLessons}
                    size={100}
                    strokeWidth={8}
                  />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-foreground">{Math.round((mockProgress.lessonsCompleted / mockProgress.totalLessons) * 100)}%</span>
                  </div>
                </div>
                <h3 className="font-medium text-foreground mb-1">Weekly Goal</h3>
                <p className="text-xs text-neutral-500 text-center mb-4">You're on track to reach your learning target.</p>
                <div className="w-full space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Herbal Foundations</span>
                    <span className="font-medium text-foreground">65%</span>
                  </div>
                  <Progress value={65} size="sm" className="h-1.5" />
                </div>
              </Card>

              {/* Community Feed / Activity */}
              <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Activity</h3>
                </div>
                <div className="p-4 space-y-4">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-medium">
                        {i === 0 ? 'M' : 'J'}
                      </div>
                      <div>
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{i === 0 ? 'Maya' : 'Jordan'}</span> {i === 0 ? 'completed a module' : 'joined the circle'}
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">{i === 0 ? '2h ago' : '5h ago'}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30">
                  <LinkButton href="/circle/community" variant="ghost" size="sm" fullWidth className="text-xs h-8">
                    View Community Feed
                  </LinkButton>
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
function BookIcon() { return <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>; }
function CheckCircleIcon() { return <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function ClockIcon() { return <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function FireIcon() { return <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>; }
function PlayIcon({className = "w-4 h-4"}: {className?: string}) { return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
