import { headers } from 'next/headers';
import { whopsdk } from '@/lib/whop-sdk';
import { courses } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/Card';
import { LinkButton } from '@/components/Button';
import { Badge, DifficultyBadge } from '@/components/Badge';
import { Progress } from '@/components/Progress';

export default async function CoursesPage() {
  let userId: string;
  let user: any;
  const role: 'admin' | 'member' | 'affiliate' = 'member';

  try {
    const headersList = await headers();
    const verification = await whopsdk.verifyUserToken(headersList);
    userId = verification.userId;
    user = await whopsdk.users.retrieve(userId);
  } catch (error) {
    userId = 'mock-user';
    user = { name: 'Wellness Seeker', username: 'wellness_seeker' };
  }

  const displayName = user?.name || `@${user?.username}` || 'Member';

  // Group courses by category
  const coursesByCategory = courses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);

  const categoryLabels: Record<string, string> = {
    'herbal-basics': '🌿 Herbal Basics',
    'wellness-rituals': '☀️ Wellness Rituals',
    'business-building': '💼 Business Building',
    'masterclass': '🎓 Masterclasses',
    'live-qa': '🎥 Live Q&A',
  };

  // Mock progress for courses
  const courseProgress: Record<string, number> = {
    'herbal-foundations': 65,
    'morning-rituals': 30,
    'build-your-brand': 0,
    'deep-sleep-masterclass': 0,
  };

  return (
    <div className="flex">
      <Sidebar role={role} userName={displayName} />
      
      <main className="main-content">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Course Library</h1>
          <p className="text-neutral-600">
            Explore our complete collection of herbal wellness courses and masterclasses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="primary" className="cursor-pointer">All Courses</Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-neutral-200">In Progress</Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-neutral-200">Completed</Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-neutral-200">Not Started</Badge>
        </div>

        {/* Course Categories */}
        <div className="space-y-12">
          {Object.entries(coursesByCategory).map(([category, categoryCourses]) => (
            <section key={category}>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                {categoryLabels[category] || category}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryCourses.map((course) => {
                  const progress = courseProgress[course.id] || 0;
                  const isStarted = progress > 0;
                  const isCompleted = progress === 100;

                  return (
                    <Card key={course.id} className="group overflow-hidden" padding="none">
                      {/* Course Thumbnail */}
                      <div className="aspect-video bg-gradient-to-br from-teal-100 to-emerald-100 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl group-hover:scale-110 transition-transform">
                            {category === 'herbal-basics' ? '🌿' : 
                             category === 'wellness-rituals' ? '☀️' : 
                             category === 'business-building' ? '💼' : 
                             category === 'masterclass' ? '🎓' : '🎥'}
                          </span>
                        </div>
                        {progress > 0 && (
                          <div className="absolute bottom-0 left-0 right-0">
                            <div className="h-1 bg-white/30">
                              <div 
                                className="h-full bg-teal-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {isCompleted && (
                          <div className="absolute top-3 right-3">
                            <Badge variant="success">✓ Completed</Badge>
                          </div>
                        )}
                      </div>

                      {/* Course Info */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-semibold text-neutral-900 group-hover:text-teal-600 transition-colors">
                            {course.title}
                          </h3>
                          <DifficultyBadge difficulty={course.difficulty} />
                        </div>
                        
                        <p className="text-sm text-neutral-500 mb-4 truncate-2">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-neutral-400 mb-4">
                          <span>{course.lessonCount} lessons</span>
                          <span>{course.duration} min</span>
                          <span>By {course.instructor}</span>
                        </div>

                        {isStarted && !isCompleted && (
                          <div className="mb-4">
                            <Progress value={progress} showLabel size="sm" />
                          </div>
                        )}

                        <LinkButton 
                          href={`/circle/courses/${course.id}`} 
                          variant={isStarted ? 'primary' : 'outline'}
                          fullWidth
                        >
                          {isCompleted ? 'Review Course' : isStarted ? 'Continue' : 'Start Course'}
                        </LinkButton>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Empty State (for when there are no courses) */}
        {courses.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">No Courses Yet</h2>
            <p className="text-neutral-600">Check back soon for new learning content!</p>
          </div>
        )}
      </main>
    </div>
  );
}
