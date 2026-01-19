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
}

export function Sidebar({ role, companyId, userName, userAvatar }: SidebarProps) {
  const pathname = usePathname();
  const baseUrl = companyId ? `/${companyId}` : '';

  const navItems: NavItem[] = [
    // Member items
    {
      label: 'Dashboard',
      href: `${baseUrl}/circle`,
      icon: <HomeIcon />,
      roles: ['member', 'affiliate', 'admin'],
    },
    {
      label: 'Courses',
      href: `${baseUrl}/circle/courses`,
      icon: <BookIcon />,
      roles: ['member', 'affiliate', 'admin'],
    },
    {
      label: 'Community',
      href: `${baseUrl}/circle/community`,
      icon: <UsersIcon />,
      roles: ['member', 'affiliate', 'admin'],
    },
    {
      label: 'My Progress',
      href: `${baseUrl}/circle/profile`,
      icon: <ChartIcon />,
      roles: ['member', 'affiliate', 'admin'],
    },
    // Affiliate items
    {
      label: 'Affiliate Dashboard',
      href: `${baseUrl}/affiliate`,
      icon: <DollarIcon />,
      roles: ['affiliate', 'admin'],
    },
    {
      label: 'My Links',
      href: `${baseUrl}/affiliate/links`,
      icon: <LinkIcon />,
      roles: ['affiliate', 'admin'],
    },
    {
      label: 'Marketing Assets',
      href: `${baseUrl}/affiliate/assets`,
      icon: <ImageIcon />,
      roles: ['affiliate', 'admin'],
    },
    {
      label: 'Analytics',
      href: `${baseUrl}/affiliate/analytics`,
      icon: <AnalyticsIcon />,
      roles: ['affiliate', 'admin'],
    },
    {
      label: 'Leaderboard',
      href: `${baseUrl}/affiliate/leaderboard`,
      icon: <TrophyIcon />,
      roles: ['affiliate', 'admin'],
    },
    // Admin items
    {
      label: 'Admin Dashboard',
      href: `${baseUrl}/admin`,
      icon: <SettingsIcon />,
      roles: ['admin'],
    },
    {
      label: 'Manage Users',
      href: `${baseUrl}/admin/users`,
      icon: <UsersIcon />,
      roles: ['admin'],
    },
    {
      label: 'Manage Content',
      href: `${baseUrl}/admin/content`,
      icon: <FileIcon />,
      roles: ['admin'],
    },
    {
      label: 'Stems Mappings',
      href: `${baseUrl}/admin/stems`,
      icon: <LeafIcon />,
      roles: ['admin'],
    },
    {
      label: 'Commissions',
      href: `${baseUrl}/admin/commissions`,
      icon: <DollarIcon />,
      roles: ['admin'],
    },
    {
      label: 'Campaigns',
      href: `${baseUrl}/admin/campaigns`,
      icon: <MegaphoneIcon />,
      roles: ['admin'],
    },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role));

  // Group items by section
  const memberItems = filteredItems.filter(item => 
    item.href.includes('/circle') || item.href === `${baseUrl}/circle`
  );
  const affiliateItems = filteredItems.filter(item => 
    item.href.includes('/affiliate')
  );
  const adminItems = filteredItems.filter(item => 
    item.href.includes('/admin')
  );

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="mb-8">
        <Link href={`${baseUrl}/`} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
            <span className="text-white text-xl">🌿</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-neutral-900">The Steep Circle</h1>
            <p className="text-xs text-neutral-500">Wellness Community</p>
          </div>
        </Link>
      </div>

      {/* User info */}
      {userName && (
        <div className="flex items-center gap-3 p-3 mb-6 rounded-xl bg-neutral-50">
          <div className="avatar">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-neutral-900 truncate">{userName}</p>
            <p className="text-xs text-neutral-500 capitalize">{role}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-6">
        {memberItems.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 px-4">
              Learning
            </p>
            <div className="space-y-1">
              {memberItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-nav-item ${pathname === item.href ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {affiliateItems.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 px-4">
              Affiliate
            </p>
            <div className="space-y-1">
              {affiliateItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-nav-item ${pathname === item.href ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {adminItems.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 px-4">
              Admin
            </p>
            <div className="space-y-1">
              {adminItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-nav-item ${pathname === item.href ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Theme Toggle & Symptom Tool */}
      <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
        <ThemeToggle />
        
        <Link
          href="/stems"
          className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 transition-colors border border-teal-100 dark:border-teal-900 dark:from-teal-900/20 dark:to-emerald-900/20"
        >
          <span className="text-2xl">🌱</span>
          <div>
            <p className="font-medium text-sm text-neutral-900 dark:text-neutral-200">Symptom-to-Stems</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Get personalized blends</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg animate-pulse" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-full flex items-center justify-between p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
    >
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-md ${theme === 'light' ? 'bg-white shadow-sm text-amber-500' : 'text-neutral-500'}`}>
          <SunIcon />
        </div>
        <div className={`p-1.5 rounded-md ${theme === 'dark' ? 'bg-neutral-700 shadow-sm text-blue-400' : 'text-neutral-500'}`}>
          <MoonIcon />
        </div>
      </div>
      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 pr-2">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

// Icons
function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  );
}
