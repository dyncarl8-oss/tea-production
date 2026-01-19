import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { getCourseById, getLessonsForCourse, lessons as allLessons } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/Card';
import { LinkButton, Button } from '@/components/Button';
import { Badge, DifficultyBadge } from '@/components/Badge';
import { Progress } from '@/components/Progress';

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

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

  // Get lessons for this course
  const courseLessons = getLessonsForCourse(courseId);
  
  // If no lessons in data, create mock lessons
  const lessons = courseLessons.length > 0 ? courseLessons : [
    { id: `${courseId}-1`, courseId, title: 'Introduction & Welcome', description: 'Get started with this course', type: 'video' as const, content: '', duration: 10, order: 1, resources: [], isPreview: true },
    { id: `${courseId}-2`, courseId, title: 'Understanding the Basics', description: 'Core concepts explained', type: 'video' as const, content: '', duration: 15, order: 2, resources: [], isPreview: false },
    { id: `${courseId}-3`, courseId, title: 'Hands-On Practice', description: 'Apply what you learned', type: 'video' as const, content: '', duration: 20, order: 3, resources: [], isPreview: false },
    { id: `${courseId}-4`, courseId, title: 'Advanced Techniques', description: 'Take it to the next level', type: 'video' as const, content: '', duration: 25, order: 4, resources: [], isPreview: false },
    { id: `${courseId}-5`, courseId, title: 'Final Summary & Next Steps', description: 'Wrap up and continue your journey', type: 'video' as const, content: '', duration: 12, order: 5, resources: [], isPreview: false },
  ];

  // Mock completed lessons
  const completedLessons = [`${courseId}-1`, `${courseId}-2`];
  const currentLessonIndex = completedLessons.length;
  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="flex">
      <Sidebar role={role} userName={displayName} />
      
      <main className="main-content">
        {/* Back Button */}
        <LinkButton href="/circle/courses" variant="ghost" className="mb-6">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Courses
        </LinkButton>

        {/* Course Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-4xl flex-shrink-0">
                🌿
              </div>
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">{course.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <DifficultyBadge difficulty={course.difficulty} />
                  <span className="text-sm text-neutral-500">
                    {lessons.length} lessons • {course.duration} min total
                  </span>
                </div>
              </div>
            </div>

            <p className="text-neutral-600 mb-6">{course.description}</p>

            {/* Instructor */}
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
              <div className="avatar">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-neutral-900">{course.instructor}</p>
                <p className="text-sm text-neutral-500">Course Instructor</p>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <Card className="lg:sticky lg:top-8 self-start">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">
                {progress === 100 ? '🎉' : progress > 0 ? '📖' : '🚀'}
              </div>
              <h3 className="font-semibold text-neutral-900">
                {progress === 100 ? 'Course Complete!' : progress > 0 ? 'In Progress' : 'Ready to Start'}
              </h3>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-500">Your Progress</span>
                <span className="font-medium text-neutral-700">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} variant={progress === 100 ? 'success' : 'default'} />
              <p className="text-xs text-neutral-400 mt-2">
                {completedLessons.length} of {lessons.length} lessons completed
              </p>
            </div>

            {currentLessonIndex < lessons.length ? (
              <LinkButton 
                href={`/circle/lessons/${lessons[currentLessonIndex].id}`}
                fullWidth
                size="lg"
              >
                {progress > 0 ? 'Continue Learning' : 'Start Course'}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </LinkButton>
            ) : (
              <LinkButton href="/circle/courses" variant="outline" fullWidth size="lg">
                Browse More Courses
              </LinkButton>
            )}
          </Card>
        </div>

        {/* Course Content */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Course Content</h2>
          
          <div className="space-y-3">
            {lessons.map((lesson, idx) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isCurrent = idx === currentLessonIndex;
              const isLocked = idx > currentLessonIndex && !lesson.isPreview;

              return (
                <Card 
                  key={lesson.id}
                  className={`
                    ${isCurrent ? 'ring-2 ring-teal-500 bg-teal-50/50' : ''}
                    ${isLocked ? 'opacity-60' : ''}
                  `}
                  hover={!isLocked}
                  padding="sm"
                >
                  <div className="flex items-center gap-4">
                    {/* Lesson Number/Status */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${isCompleted 
                        ? 'bg-teal-500 text-white' 
                        : isCurrent 
                          ? 'bg-teal-100 text-teal-700 ring-4 ring-teal-50'
                          : 'bg-neutral-100 text-neutral-400'
                      }
                    `}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isLocked ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      ) : (
                        idx + 1
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${isLocked ? 'text-neutral-400' : 'text-neutral-900'}`}>
                          {lesson.title}
                        </h4>
                        {lesson.isPreview && <Badge variant="info" size="sm">Preview</Badge>}
                      </div>
                      <p className="text-sm text-neutral-500">{lesson.description}</p>
                    </div>

                    {/* Duration & Type */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-sm text-neutral-400 flex items-center gap-1">
                        {lesson.type === 'video' ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : lesson.type === 'pdf' ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {lesson.duration} min
                      </span>

                      {!isLocked && (
                        <LinkButton 
                          href={`/circle/lessons/${lesson.id}`}
                          variant={isCurrent ? 'primary' : 'ghost'}
                          size="sm"
                        >
                          {isCompleted ? 'Review' : isCurrent ? 'Watch' : 'Preview'}
                        </LinkButton>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">What You'll Learn</h2>
          <Card>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Core principles of herbal wellness',
                'How to select the right herbs for your needs',
                'Proper brewing techniques for maximum benefit',
                'Creating sustainable wellness rituals',
                'Understanding herbal combinations',
                'Building a daily practice that works',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-600">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
