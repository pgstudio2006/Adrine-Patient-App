'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFamilyContext } from '../contexts/FamilyContext';
import { useFamilyMembers } from '../modules/family/hooks';
import { BottomNav } from './BottomNav';
import { AiCopilotFAB } from './AiCopilotFAB';
import { Avatar } from '../design-system';
import { CaretDown, CheckCircle, Sparkle, XCircle } from '@phosphor-icons/react';

const HIDDEN_NAV_PATHS = ['/login'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { session, loading, logout, platformConnected } = useAuth();
  const { activeMember, isManagingOther, contextLabel, switchToMember } = useFamilyContext();
  const { data: familyMembers } = useFamilyMembers();
  const router = useRouter();
  const pathname = usePathname();
  const [showSwitcher, setShowSwitcher] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !session && pathname !== '/login') {
      router.replace('/login');
    }
  }, [loading, session, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
          <p className="text-sm text-muted">Loading…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <>{children}</>;
  }

  const showNav = !HIDDEN_NAV_PATHS.includes(pathname);

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Top header bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        {/* Context switch banner */}
        {isManagingOther && (
          <div className="bg-primary-600 text-white">
            <div className="max-w-lg mx-auto flex items-center justify-between px-4 h-9">
              <div className="flex items-center gap-2 min-w-0">
                <Sparkle size={12} weight="fill" className="shrink-0 text-primary-200" />
                <span className="text-xs font-medium truncate">{contextLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => switchToMember(null)}
                className="flex items-center gap-1 text-[10px] font-medium text-white/80 hover:text-white shrink-0 ml-2 transition-colors"
              >
                <XCircle size={12} weight="fill" />
                Switch back
              </button>
            </div>
          </div>
        )}
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-gray-900">Adrine</span>
            </Link>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              platformConnected
                ? 'bg-green-50 text-green-600'
                : 'bg-amber-50 text-amber-600'
            }`}>
              {platformConnected ? 'Live' : 'Demo'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn-ghost btn-icon rounded-full"
              title="Notifications"
            >
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>

            {/* Family context switcher */}
            <div className="relative" ref={switcherRef}>
              <button
                type="button"
                onClick={() => setShowSwitcher(!showSwitcher)}
                className={`flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-lg transition-colors ${
                  isManagingOther
                    ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Avatar
                  name={isManagingOther && activeMember ? activeMember.name : session.name}
                  size="sm"
                />
                <span className="text-sm font-medium hidden sm:block max-w-[80px] truncate">
                  {isManagingOther && activeMember ? activeMember.name.split(' ')[0] : session.name}
                </span>
                <CaretDown size={12} weight="bold" className="hidden sm:block" />
              </button>

              {/* Dropdown */}
              {showSwitcher && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSwitcher(false)} />
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-20">
                    <div className="px-3 py-1.5">
                      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Switch Context</p>
                    </div>

                    {/* Self */}
                    <button
                      type="button"
                      onClick={() => { switchToMember(null); setShowSwitcher(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                        !isManagingOther
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Avatar name={session.name} size="sm" />
                      <span className="flex-1 text-left truncate">{session.name}</span>
                      {!isManagingOther && <CheckCircle size={14} weight="fill" className="text-primary-600" />}
                    </button>

                    <hr className="my-1 border-gray-100" />

                    {/* Family members */}
                    {familyMembers
                      ?.filter((m) => m.relationship !== 'self' && m.status === 'active')
                      .map((member) => (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => { switchToMember(member); setShowSwitcher(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                            activeMember?.id === member.id
                              ? 'bg-primary-50 text-primary-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                            {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <span className="block truncate">{member.name}</span>
                            <span className="block text-[10px] text-muted">{member.relationship === 'parent' ? 'Parent' : member.relationship === 'child' ? 'Child' : member.relationship === 'spouse' ? 'Spouse' : member.relationship}</span>
                          </div>
                          {activeMember?.id === member.id && <CheckCircle size={14} weight="fill" className="text-primary-600" />}
                        </button>
                      ))}

                    {(!familyMembers || familyMembers.filter((m) => m.relationship !== 'self' && m.status === 'active').length === 0) && (
                      <div className="px-3 py-3 text-center">
                        <p className="text-xs text-muted">No family members yet</p>
                        <Link href="/family" className="text-xs font-medium text-primary-600 hover:text-primary-700 mt-1 inline-block" onClick={() => setShowSwitcher(false)}>
                          Add family members
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Logout button */}
            <button
              type="button"
              onClick={logout}
              className="btn-ghost btn-icon rounded-full"
              title="Log out"
            >
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-lg mx-auto px-4 py-5 pb-24">
        {children}
      </main>

      {/* Bottom navigation */}
      {showNav && <BottomNav />}

      {/* AI Copilot FAB */}
      {showNav && <AiCopilotFAB />}
    </div>
  );
}
