'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Plus,
  Sparkle,
  SealWarning,
  Syringe,
  Pill,
  ChatCircleDots,
  ArrowRight,
  Heartbeat,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, CardContent, StatusBadge } from '../../src/design-system';
import { useAuth } from '../../src/contexts/AuthContext';
import { useAppointments } from '../../src/modules/appointments/hooks';

function formatDateBadge(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return 'TD';
  if (d.toDateString() === tomorrow.toDateString()) return 'TM';
  const day = d.getDate();
  const month = d.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
  return `${day} ${month}`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

// Mock AI insights
const MOCK_INSIGHTS = [
  {
    id: '1',
    type: 'trend',
    icon: Heartbeat,
    title: 'Heart rate trending well',
    description: 'Your resting heart rate has improved 5% this month. Keep up the good work!',
    time: '2 hours ago',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    id: '2',
    type: 'reminder',
    icon: Pill,
    title: 'Medication refill needed',
    description: 'Your Atorvastatin prescription runs out in 3 days. Request a refill.',
    time: 'Yesterday',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    id: '3',
    type: 'result',
    icon: Syringe,
    title: 'Lab results available',
    description: 'Your HbA1c results from City Diagnostic Lab are ready to review.',
    time: '2 days ago',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
];

const QUICK_ACTIONS = [
  { label: 'Book Appointment', icon: CalendarCheck, href: '/care', color: 'bg-primary-500' },
  { label: 'AI Health Chat', icon: ChatCircleDots, href: '#', color: 'bg-blue-500' },
  { label: 'Emergency SOS', icon: SealWarning, href: '#', color: 'bg-red-500' },
  { label: 'Order Refill', icon: Pill, href: '/prescriptions', color: 'bg-purple-500' },
];

export default function DashboardPage() {
  const { session } = useAuth();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  });

  const { data: appointments } = useAppointments();
  const upcomingAppts = (appointments ?? [])
    .filter((a) => a.status !== 'cancelled' && a.status !== 'completed' && a.status !== 'no_show')
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-5">
      {/* Greeting & Health Score */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {greeting}{session?.name ? `, ${session.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-sm text-muted mt-0.5">Here&apos;s your health overview</p>
        </div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          View profile
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-2">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return action.href.startsWith('/') ? (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-150 hover:-translate-y-0.5 active:scale-95"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} text-white`}>
                  <Icon size={20} weight="fill" />
                </div>
                <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">{action.label}</span>
              </Link>
            ) : (
              <button
                key={action.label}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-150 hover:-translate-y-0.5 active:scale-95"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} text-white`}>
                  <Icon size={20} weight="fill" />
                </div>
                <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <Card variant="hover">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarCheck size={18} className="text-primary-600" weight="fill" />
            <CardTitle>Upcoming Appointments</CardTitle>
          </div>
          <Link href="/care" className="text-xs font-medium text-primary-600 hover:text-primary-700">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          {upcomingAppts.length > 0 ? (
            <div className="space-y-3">                  {upcomingAppts.map((apt) => (
                <Link key={apt.id} href={`/appointments/${apt.id}`} className="block">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold leading-tight text-center">
                        {formatDateBadge(apt.startAt)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{apt.providerName}</p>
                        {apt.patientName && apt.patientName !== 'You' && (
                          <span className="shrink-0 text-[10px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                            {apt.patientName}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted">{apt.specialty}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-600">{formatTime(apt.startAt)}</span>
                        <StatusBadge
                          status={apt.status}
                          domain="appointment"
                        />
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-muted shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted">No upcoming appointments</p>
              <Link href="/care" className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 mt-2">
                <Plus size={16} weight="bold" />
                Book an appointment
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insights Feed */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkle size={16} className="text-primary-600" weight="fill" />
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">AI Insights</h2>
        </div>
        <div className="space-y-3">
          {MOCK_INSIGHTS.map((insight) => {
            const Icon = insight.icon;
            return (
              <Card key={insight.id} padding="md" variant="hover">
                <div className="flex gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${insight.bg}`}>
                    <Icon size={18} weight="fill" className={insight.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">{insight.title}</h3>
                      <span className="text-[10px] text-muted whitespace-nowrap">{insight.time}</span>
                    </div>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
