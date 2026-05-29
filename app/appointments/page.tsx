'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, CalendarCheck, Funnel } from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, EmptyState, StatusBadge, Button } from '../../src/design-system';
import { useAppointments } from '../../src/modules/appointments/hooks';
import { useFamilyMembers } from '../../src/modules/family/hooks';
import type { Appointment } from '../../src/modules/appointments/types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function getGroup(date: string): string {
  const d = new Date(date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  if (d > new Date()) return 'Upcoming';
  return 'Past';
}

export default function AppointmentsPage() {
  const { data: appointments, isLoading, error } = useAppointments();
  const { data: familyMembers } = useFamilyMembers();
  const [filterMember, setFilterMember] = useState<string>('all');

  // Build unique patient name list from appointments + family members
  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'self', label: 'You' },
    ...(familyMembers ?? [])
      .filter((m) => m.relationship !== 'self' && m.status === 'active')
      .map((m) => ({ id: m.patientId, label: m.name.split(' (')[0] })),
  ];

  // Get unique patient names from appointments for filter
  const getPatientFilterId = (apt: Appointment): string => {
    if (!apt.patientName || apt.patientName === 'You') return 'self';
    return apt.patientId;
  };

  // Filter appointments
  const filtered = (appointments ?? []).filter((a) => {
    if (filterMember === 'all') return true;
    return getPatientFilterId(a) === filterMember;
  });

  // Group appointments
  const upcoming = filtered
    .filter((a) => a.status !== 'cancelled' && a.status !== 'no_show' && !['completed', 'past'].includes(getGroup(a.startAt)))
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  const past = filtered
    .filter((a) => a.status === 'completed' || a.status === 'no_show' || getGroup(a.startAt) === 'Past')
    .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/care" className="btn-ghost btn-icon rounded-full">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
            <p className="text-sm text-muted">Manage your visits</p>
          </div>
        </div>
        <Link href="/appointments/book" className="btn-primary btn-sm">
          <Plus size={16} weight="bold" />
          Book
        </Link>
      </div>

      {/* Family filter bar */}
      {filterOptions.length > 2 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 py-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilterMember(opt.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                filterMember === opt.id
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md">
              <div className="space-y-2 animate-pulse">
                <div className="h-5 w-44 skeleton" />
                <div className="h-4 w-32 skeleton" />
                <div className="h-4 w-24 skeleton" />
              </div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card padding="lg">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900">Failed to load appointments</p>
            <Button variant="secondary" size="sm" className="mt-3" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Card>
      ) : appointments && appointments.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<CalendarCheck size={40} className="text-muted" />}
            title="No appointments yet"
            description="Book your first appointment to get started."
            action={
              <Link href="/appointments/book" className="btn-primary btn-sm">
                <Plus size={16} weight="bold" />
                Book Appointment
              </Link>
            }
          />
        </Card>
      ) : (
        <>
          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Upcoming</h2>
              <div className="space-y-2">
                {upcoming.map((apt) => (
                  <Link key={apt.id} href={`/appointments/${apt.id}`}>
                    <Card variant="hover" padding="md">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold shrink-0">
                          {apt.providerName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{apt.providerName}</h3>
                            {apt.patientName && apt.patientName !== 'You' && (
                              <span className="shrink-0 text-[10px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                                {apt.patientName}
                              </span>
                            )}
                            <StatusBadge status={apt.status} domain="appointment" />
                          </div>
                          <p className="text-xs text-muted mt-0.5">{apt.specialty}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {apt.patientName && apt.patientName !== 'You' ? `${apt.patientName} · ` : ''}{formatDate(apt.startAt)} · {formatTime(apt.startAt)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          {past.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Past</h2>
              <div className="space-y-2">
                {past.map((apt) => (
                  <Link key={apt.id} href={`/appointments/${apt.id}`}>
                    <Card variant="hover" padding="md">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-bold shrink-0">
                          {apt.providerName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{apt.providerName}</h3>
                            {apt.patientName && apt.patientName !== 'You' && (
                              <span className="shrink-0 text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                {apt.patientName}
                              </span>
                            )}
                            <StatusBadge status={apt.status} domain="appointment" />
                          </div>
                          <p className="text-xs text-muted mt-0.5">{apt.specialty}</p>
                          <p className="text-xs text-muted mt-1">
                            {apt.patientName && apt.patientName !== 'You' ? `${apt.patientName} · ` : ''}{formatDate(apt.startAt)} · {formatTime(apt.startAt)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
