'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  CalendarBlank,
  Clock,
  ArrowRight,
  Bell,
} from '@phosphor-icons/react';
import { Card, Button } from '../../../../src/design-system';
import { useAppointment } from '../../../../src/modules/appointments/hooks';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'long',
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

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('id') ?? '';
  const { data: appointment } = useAppointment(appointmentId);

  return (
    <div className="space-y-6 pt-4">
      {/* Success animation */}
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-4 animate-scale-in">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={36} className="text-green-600" weight="fill" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Appointment Booked!</h1>
        <p className="text-sm text-muted mt-1">
          Your appointment has been confirmed successfully
        </p>
      </div>

      {/* Appointment summary */}
      {appointment && (
        <Card padding="lg" className="animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-base font-bold shrink-0">
              {appointment.providerName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">{appointment.providerName}</h2>
              <p className="text-xs text-muted">{appointment.specialty}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CalendarBlank size={18} className="text-primary-600" />
              <p className="text-sm text-gray-700">{formatDate(appointment.startAt)}</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-primary-600" />
              <p className="text-sm text-gray-700">{formatTime(appointment.startAt)}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Reminder setup */}
      <Card padding="md" variant="flat" className="animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <Bell size={20} weight="fill" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">Reminders are set</h3>
            <p className="text-xs text-muted mt-0.5">
              You&apos;ll receive reminders 24 hours and 15 minutes before your appointment.
            </p>
          </div>
        </div>
      </Card>

      {/* Next steps */}
      <Card padding="md" variant="flat" className="animate-slide-up">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Next Steps</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-xs text-gray-600">
            <CheckCircle size={14} className="text-success shrink-0 mt-0.5" weight="fill" />
            Add this appointment to your calendar
          </li>
          <li className="flex items-start gap-2 text-xs text-gray-600">
            <CheckCircle size={14} className="text-success shrink-0 mt-0.5" weight="fill" />
            Review preparation instructions on the appointment detail page
          </li>
          {!appointment?.preparation?.length && (
            <li className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle size={14} className="text-success shrink-0 mt-0.5" weight="fill" />
              Arrive 15 minutes early for check-in
            </li>
          )}
        </ul>
      </Card>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <Link
          href={`/appointments/${appointmentId}`}
          className="btn-primary w-full justify-center"
        >
          <ArrowRight size={18} weight="bold" />
          View Appointment Details
        </Link>
        <Link
          href="/dashboard"
          className="btn-secondary w-full justify-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
