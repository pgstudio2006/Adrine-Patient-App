'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  House,
  Heartbeat,
  Folder,
  Users,
  User,
} from '@phosphor-icons/react';

const TABS = [
  { href: '/dashboard', label: 'Home', icon: House },
  { href: '/care', label: 'Care', icon: Heartbeat },
  { href: '/records', label: 'Records', icon: Folder },
  { href: '/family', label: 'Family', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (pathname === href) return true;
    if (pathname.startsWith(href + '/')) return true;
    if (href === '/dashboard' && pathname === '/') return true;
    if (href === '/records' && (pathname.startsWith('/reports') || pathname.startsWith('/prescriptions'))) return true;
    return false;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 safe-area-bottom" aria-label="Main navigation">
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-1">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              aria-label={label}
              className={`relative flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-150
                ${active
                  ? 'text-primary-600'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <Icon
                size={22}
                weight={active ? 'fill' : 'regular'}
              />
              <span className={`text-[10px] font-medium leading-none ${active ? 'text-primary-600' : 'text-gray-400'}`}>
                {label}
              </span>
              {active && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
