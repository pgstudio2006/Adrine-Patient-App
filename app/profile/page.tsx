'use client';

import { useAuth } from '../../src/contexts/AuthContext';
import {
  User,
  Bell,
  CreditCard,
  ShieldCheck,
  GearSix,
  SignOut,
  CaretRight,
} from '@phosphor-icons/react';
import { Card, Badge, Avatar } from '../../src/design-system';

const SETTINGS_GROUPS = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Personal Information', href: '#' },
      { icon: ShieldCheck, label: 'Security & Privacy', href: '#' },
      { icon: CreditCard, label: 'Insurance & Payments', href: '#' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', href: '#' },
      { icon: GearSix, label: 'App Settings', href: '#' },
    ],
  },
];

export default function ProfilePage() {
  const { session, logout, platformConnected } = useAuth();

  return (
    <div className="space-y-5">
      {/* Profile Header */}
      <Card padding="lg">
        <div className="flex items-center gap-4">
          <Avatar name={session?.name ?? 'User'} size="xl" />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{session?.name ?? 'User'}</h1>
            <p className="text-sm text-muted truncate">{session?.email ?? 'No email'}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant={platformConnected ? 'success' : 'warning'} dot>
                {platformConnected ? 'Connected' : 'Demo Mode'}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings groups */}
      {SETTINGS_GROUPS.map((group) => (
        <div key={group.title}>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 px-0.5">
            {group.title}
          </h2>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Icon size={18} weight="fill" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-gray-900">{item.label}</span>
                  <CaretRight size={16} className="text-muted" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <div className="pt-2">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
        >
          <SignOut size={18} />
          Sign Out
        </button>
      </div>

      <p className="text-xs text-muted text-center pb-4">
        Adrine Patient App v0.1.0
      </p>
    </div>
  );
}
