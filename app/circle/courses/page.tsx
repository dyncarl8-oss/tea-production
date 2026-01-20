import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from '@/lib/whop-sdk';
import { courses } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';

export default async function CoursesPage() {
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

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Sidebar role={role} userName={displayName} userAvatar={avatarUrl} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="pb-6 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="h1-dense uppercase italic tracking-tighter">Course library</h1>
              <p className="sub-dense">Immerse yourself in centuries of herbal wisdom.</p>
            </div>
            <div className="flex gap-2">
               <span className="badge-frosted badge-orange">12 COURSES</span>
               <span className="badge-frosted badge-green">4 IN PROGRESS</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {Object.entries(coursesByCategory).map(([category, categoryCourses]) => (
              <section key={category} className="space-y-6">
                <div className="flex items-center gap-3">
                   <h2 className="h2-dense uppercase italic tracking-tight">{categoryLabels[category] || category}</h2>
                   <div className="flex-1 h-[1px] bg-white/5" />
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryCourses.map((course) => (
                    <div key={course.id} className="frosted-card group overflow-hidden flex flex-col hover:border-orange-500/30 transition-all duration-500 cursor-pointer">
                      {/* Thumbnail Area */}
                      <div className="aspect-[16/10] bg-white/5 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                        <span className="text-5xl group-hover:scale-125 transition-transform duration-700 opacity-60">
                           {category === 'herbal-basics' ? '🌿' : 
                            category === 'wellness-rituals' ? '☀️' : 
                            category === 'business-building' ? '💼' : 
                            category === 'masterclass' ? '🎓' : '🎥'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-3 left-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           <span className="badge-frosted badge-orange uppercase text-[9px] font-black italic">Open Module</span>
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="font-black text-sm uppercase italic tracking-tighter leading-tight group-hover:text-orange-500 transition-colors">
                            {course.title}
                          </h3>
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest
                            ${course.difficulty === 'beginner' ? 'border-green-500/30 text-green-500 bg-green-500/10' : 
                              course.difficulty === 'intermediate' ? 'border-orange-500/30 text-orange-500 bg-orange-500/10' : 
                              'border-red-500/30 text-red-500 bg-red-500/10'}`}
                          >
                            {course.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-[11px] text-muted line-clamp-2 mb-4 leading-relaxed font-medium">
                          {course.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-muted">
                          <div className="flex gap-3">
                             <span>{course.lessonCount} Lessons</span>
                             <span>{course.duration} Min</span>
                          </div>
                          <span className="text-foreground italic opacity-70 italic">By {course.instructor}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
