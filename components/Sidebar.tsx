'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import type { UserRole } from '@/lib/types';

interface SidebarProps {
  role: UserRole;
  companyId?: string;
  userName?: string;
  userAvatar?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: UserRole[];
  badge?: string;
}

export function Sidebar({ role, companyId, userName, userAvatar }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const navItems: NavItem[] = [
    {
      label: 'Home Dashboard',
      href: `/circle`,
      icon: <HomeIcon />,
      roles: ['member', 'affiliate', 'admin'],
    },
    {
      label: 'Herbal Guide',
      href: `/stems`,
      icon: <SparklesIcon />,
      roles: ['member', 'affiliate', 'admin'],
      badge: 'STREAK',
    },
    {
      label: 'Steep Library',
      href: `/circle/courses`,
      icon: <BookIcon />,
      roles: ['member', 'affiliate', 'admin'],
    },
    {
      label: 'Inner Circle',
      href: `/circle/community`,
      icon: <UsersIcon />,
      roles: ['member', 'affiliate', 'admin'],
    },
    {
      label: 'Growth Toolkit',
      href: `/affiliate`,
      icon: <TargetIcon />,
      roles: ['member', 'affiliate', 'admin'],
    },
    {
      label: 'My Progress',
      href: `/circle/profile`,
      icon: <ChartIcon />,
      roles: ['member', 'affiliate', 'admin'],
    },
    {
      label: 'System Admin',
      href: `/admin`,
      icon: <SettingsIcon />,
      roles: ['admin'],
    },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-68 h-screen flex flex-col p-6 bg-background border-r border-border backdrop-blur-3xl overflow-y-auto">
      {/* Branding */}
      <div className="mb-10 pl-2">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-500">
            <span className="text-white text-2xl">🌱</span>
          </div>
          <div>
            <h1 className="font-black text-base tracking-tighter uppercase italic leading-none mb-1">The Steep</h1>
            <p className="text-[10px] font-bold text-orange-500 tracking-[0.3em] uppercase leading-none opacity-80">Ecosystem</p>
          </div>
        </Link>
      </div>

      {/* Identity Card */}
      {mounted && userName && (
        <div className="frosted-card p-3 mb-8 flex items-center gap-3 border-orange-500/10">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 shadow-inner">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-sm font-black uppercase text-orange-500 italic bg-orange-500/5">
                {userName.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 pr-2">
            <p className="text-[12px] font-black truncate tracking-tighter uppercase italic">{userName}</p>
            <div className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <p className="text-[9px] font-black uppercase tracking-widest text-muted italic opacity-60">Verified {role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Unified Navigation */}
      <nav className="flex-1 space-y-1.5">
        {filteredItems.map(item => {
          const isActive = pathname === item.href || (item.href !== '/circle' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30 -translate-x-1' 
                  : 'text-muted hover:bg-white/5 hover:text-foreground'
                }`}
            >
              <div className="flex items-center gap-4">
                <div className={`${isActive ? 'text-white' : 'text-muted group-hover:text-orange-500'} transition-colors duration-300`}>
                  {item.icon}
                </div>
                <span className="uppercase tracking-widest text-[11px] font-black italic">{item.label}</span>
              </div>
              {item.badge && !isActive && (
                 <span className="bg-orange-500/10 text-orange-500 text-[8px] font-black px-1.5 py-0.5 rounded-lg border border-orange-500/20">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="mt-6 pt-6 border-t border-border space-y-5">
        <ThemeToggle />
        
        {/* Quick Conversion CTA */}
        <Link
          href="/stems"
          className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/10 hover:border-orange-500/30 hover:scale-[1.02] transition-all duration-500 group"
        >
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all">
             <span className="text-xl">🍵</span>
          </div>
          <div>
             <p className="text-[10px] font-black uppercase tracking-widest italic leading-none mb-1 group-hover:text-orange-500 transition-colors">Personal Blend</p>
             <p className="text-[9px] text-muted leading-tight font-medium">Daily Wellness Check</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-10 w-full bg-white/5 rounded-2xl animate-pulse" />;

  return (
    <div className="p-1.5 bg-white/5 rounded-2xl border border-white/5 flex gap-1.5">
       <button 
         onClick={() => setTheme('light')}
         className={`flex-1 flex items-center justify-center py-2 rounded-xl transition-all duration-500 ${theme === 'light' ? 'bg-white shadow-lg text-orange-500' : 'text-muted hover:text-foreground'}`}
       >
         <SunIcon />
       </button>
       <button 
         onClick={() => setTheme('dark')}
         className={`flex-1 flex items-center justify-center py-2 rounded-xl transition-all duration-500 ${theme === 'dark' ? 'bg-[#1a1a1a] shadow-lg text-orange-500 border border-white/5' : 'text-muted hover:text-foreground'}`}
       >
         <MoonIcon />
       </button>
    </div>
  );
}

// Icons
function HomeIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>; }
function BookIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>; }
function UsersIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>; }
function ChartIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>; }
function SettingsIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
function SparklesIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>; }
function TargetIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>; }
function SunIcon() { return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>; }
function MoonIcon() { return <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>; }
