'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CalendarBlank,
  Clock,
  MapPin,
  Note,
  VideoCamera,
  XCircle,
  ArrowsClockwise,
  CheckCircle,
  SealWarning,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, Badge, Button, StatusBadge } from '../../../src/design-system';
import { useAppointment, useCancelAppointment, useRescheduleAppointment } from '../../../src/modules/appointments/hooks';
import { AppointmentDetailsSkeleton } from '../../../src/modules/appointments/components/AppointmentDetailsSkeleton';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getTimeRemaining(startAt: string): string {
  const diff = new Date(startAt).getTime() - Date.now();
  if (diff < 0) return 'Past';
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (hours > 24) return `${Math.floor(hours / 24)} days away`;
  if (hours > 0) return `${hours}h ${mins}m remaining`;
  return `${mins}m remaining`;
}

const ICON_CLASS = 'w-5 h-5 text-muted shrink-0 mt-0.5';

export default function AppointmentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: appointment, isLoading, error } = useAppointment(params.id);
  const cancelMutation = useCancelAppointment();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showReschedulePicker, setShowReschedulePicker] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const rescheduleMutation = useRescheduleAppointment();

  if (isLoading) return <AppointmentDetailsSkeleton />;

  if (error || !appointment) {
    return (
      <div className="space-y-4">
        <button onClick={() => router.back()} className="btn-ghost btn-icon rounded-full" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <Card padding="lg">
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <SealWarning size={28} weight="fill" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Appointment not found</h2>
            <p className="text-sm text-muted mt-1">This appointment may have been removed or doesn&apos;t exist.</p>
            <Link href="/appointments" className="btn-primary mt-6">Back to Appointments</Link>
          </div>
        </Card>
      </div>
    );
  }

  const isUpcoming = appointment.status === 'scheduled' || appointment.status === 'confirmed';
  const isPast = appointment.status === 'completed' || appointment.status === 'no_show';
  const isTelemedicine = appointment.type === 'telemedicine';
  const canCancel = isUpcoming;
  const canJoin = isTelemedicine && isUpcoming;

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button onClick={() => router.back()} className="btn-ghost btn-icon rounded-full" aria-label="Go back">
        <ArrowLeft size={20} />
      </button>

      {/* Doctor card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-lg font-bold shrink-0">
              {appointment.providerName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
          <h1 className="text-lg font-bold text-gray-900">{appointment.providerName}</h1>
          <p className="text-sm text-muted">{appointment.specialty}</p>
          {appointment.patientName && appointment.patientName !== 'You' && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                {appointment.patientName}
              </span>
            </div>
          )}
            </div>
          </div>
          <StatusBadge status={appointment.status} domain="appointment" />
        </CardHeader>
      </Card>

      {/* Date & Time */}
      <Card>
        <CardTitle className="mb-3">Date & Time</CardTitle>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CalendarBlank size={20} className="text-primary-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">{formatDate(appointment.startAt)}</p>
              <p className="text-xs text-muted">{getTimeRemaining(appointment.startAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-primary-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {formatTime(appointment.startAt)} – {formatTime(appointment.endAt)}
              </p>
              <p className="text-xs text-muted">{appointment.type === 'telemedicine' ? 'Video consultation' : 'In-person visit'}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Location (for in-person) */}
      {appointment.location && (
        <Card>
          <CardTitle className="mb-3">Location</CardTitle>
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-primary-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">{appointment.location.name}</p>
              <p className="text-sm text-muted">{appointment.location.address}</p>
              {appointment.location.landmark && (
                <p className="text-xs text-muted mt-0.5">Landmark: {appointment.location.landmark}</p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Preparation (for upcoming) */}
      {appointment.preparation && appointment.preparation.length > 0 && (
        <Card>
          <CardTitle className="mb-3">Preparation</CardTitle>
          <ul className="space-y-2">
            {appointment.preparation.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-success shrink-0 mt-0.5" weight="fill" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Notes */}
      {appointment.notes && (
        <Card>
          <CardTitle className="mb-3">Notes</CardTitle>
          <div className="flex items-start gap-3">
            <Note size={20} className="text-muted shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{appointment.notes}</p>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 pt-2">
        {canJoin && (
          <Link href={`/telemedicine/${appointment.id}`} className="btn-primary w-full justify-center">
            <VideoCamera size={18} weight="fill" />
            Join Video Call
          </Link>
        )}

        {canCancel && (
          <>
            <Button variant="secondary" className="w-full justify-center" icon={<ArrowsClockwise size={18} />} onClick={() => setShowReschedulePicker(true)}>
              Reschedule
            </Button>
            <Button
              variant="danger"
              className="w-full justify-center"
              icon={<XCircle size={18} />}
              onClick={() => setShowCancelConfirm(true)}
              loading={cancelMutation.isPending}
            >
              Cancel Appointment
            </Button>
          </>
        )}
      </div>

      {/* Reschedule picker modal */}
      {showReschedulePicker && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Reschedule appointment"
          onClick={() => setShowReschedulePicker(false)}
          onKeyDown={(e) => e.key === 'Escape' && setShowReschedulePicker(false)}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-3">
                <ArrowsClockwise size={24} weight="fill" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Reschedule Appointment</h2>
              <p className="text-sm text-muted mt-2">
                {appointment.providerName} &middot; {appointment.specialty}
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">New Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="input w-full"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">New Time</label>
                <input
                  type="time"
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="input w-full"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" className="flex-1" onClick={() => setShowReschedulePicker(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                loading={rescheduleMutation.isPending}
                disabled={!rescheduleDate || !rescheduleTime}
                onClick={() => {
                  rescheduleMutation.mutate(
                    { id: params.id, date: rescheduleDate, time: rescheduleTime },
                    {
                      onSuccess: () => {
                        setShowReschedulePicker(false);
                        router.refresh();
                      },
                    },
                  );
                }}
              >
                Confirm
              </Button>
            </div>
            {rescheduleMutation.isError && (
              <p className="text-xs text-red-600 mt-3 text-center">Failed to reschedule. Please try again.</p>
            )}
          </div>
        </div>
      )}

      {/* Cancel confirmation modal */}
      {showCancelConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Cancel appointment"
          onClick={() => setShowCancelConfirm(false)}
          onKeyDown={(e) => e.key === 'Escape' && setShowCancelConfirm(false)}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
                <XCircle size={24} weight="fill" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Cancel appointment?</h2>
              <p className="text-sm text-muted mt-2">
                Cancel your {appointment.type === 'telemedicine' ? 'telemedicine' : 'in-person'} appointment with{' '}
                <strong>{appointment.providerName}</strong> on{' '}
                {formatDate(appointment.startAt)} at {formatTime(appointment.startAt)}?
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" className="flex-1" onClick={() => setShowCancelConfirm(false)}>
                Keep
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                loading={cancelMutation.isPending}
                onClick={() => {
                  cancelMutation.mutate(params.id, {
                    onSuccess: () => {
                      setShowCancelConfirm(false);
                      router.refresh();
                    },
                  });
                }}
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success toast after cancel */}
      {cancelMutation.isSuccess && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg animate-slide-up flex items-center gap-2 text-sm font-medium">
          <CheckCircle size={18} weight="fill" />
          Appointment cancelled successfully
        </div>
      )}

      {/* Success toast after reschedule */}
      {rescheduleMutation.isSuccess && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg animate-slide-up flex items-center gap-2 text-sm font-medium">
          <CheckCircle size={18} weight="fill" />
          Appointment rescheduled successfully
        </div>
      )}
    </div>
  );
}
