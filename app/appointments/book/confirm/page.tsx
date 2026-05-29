'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CalendarBlank,
  Clock,
  VideoCamera,
  Building,
  Note,
  ShieldCheck,
  CaretDown,
  User,
  UsersThree,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, Badge, Button } from '../../../../src/design-system';
import { useProviders, useBookAppointment } from '../../../../src/modules/appointments/hooks';
import { useFamilyContext } from '../../../../src/contexts/FamilyContext';
import { useFamilyMembers } from '../../../../src/modules/family/hooks';

function formatDateLabel(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function ConfirmBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get('providerId') ?? '';
  const date = searchParams.get('date') ?? '';
  const time = searchParams.get('time') ?? '';
  const type = searchParams.get('type') ?? 'in_person';

  const { data: providers } = useProviders();
  const bookMutation = useBookAppointment();
  const provider = providers?.find((p) => p.id === providerId);
  const [notes, setNotes] = useState('');
  const [bookFor, setBookFor] = useState('self');
  const [showMemberPicker, setShowMemberPicker] = useState(false);

  const { activeMember } = useFamilyContext();
  const { data: familyMembers } = useFamilyMembers();

  // Determine who we're booking for
  const activeFamilyMember = activeMember && activeMember.relationship !== 'self' ? activeMember : null;
  const availableMembers = (familyMembers ?? []).filter((m) => m.relationship !== 'self' && m.status === 'active');

  // If a family context is active, pre-select that member
  const selectedMemberId = bookFor !== 'self' ? bookFor : null;
  const selectedMember = selectedMemberId
    ? familyMembers?.find((m) => m.id === selectedMemberId)
    : activeFamilyMember;
  const displayName = selectedMember?.name.split(' (')[0] ?? 'You';

  if (!provider) {
    return (
      <div className="space-y-4">
        <Link href="/appointments/book" className="btn-ghost btn-icon rounded-full">
          <ArrowLeft size={20} />
        </Link>
        <Card padding="lg">
          <p className="text-sm text-muted text-center py-4">Provider not found. Please start over.</p>
        </Card>
      </div>
    );
  }

  const handleConfirm = () => {
    const patientName = selectedMember?.name;
    bookMutation.mutate(
      {
        providerId: provider.id,
        patientId: selectedMember?.patientId ?? 'patient-1',
        patientName,
        type,
        date,
        time,
        notes: notes || undefined,
      },
      {
        onSuccess: (appointment) => {
          router.push(`/appointments/book/success?id=${appointment.id}`);
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href={`/appointments/book/slots?providerId=${providerId}`} className="btn-ghost btn-icon rounded-full">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Confirm Booking</h1>
          <p className="text-sm text-muted">Review your appointment details</p>
        </div>
      </div>

      {/* Doctor summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-base font-bold shrink-0">
              {provider.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">{provider.name}</h2>
              <p className="text-xs text-muted">{provider.specialty} · {provider.qualification}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Book for — family member selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UsersThree size={18} className="text-primary-600" />
            <CardTitle>Booking for</CardTitle>
          </div>
        </CardHeader>
        <div className="px-4 pb-4">
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-white"
              onClick={() => setShowMemberPicker(!showMemberPicker)}
            >
              <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                <User size={16} weight="fill" />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-900 text-left">{displayName}</span>
              <CaretDown size={16} className="text-muted" />
            </button>

            {showMemberPicker && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMemberPicker(false)} />
                <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {/* Self option */}
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                      bookFor === 'self' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => { setBookFor('self'); setShowMemberPicker(false); }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">
                      Y
                    </div>
                    <span className="font-medium">Myself</span>
                    {bookFor === 'self' && (
                      <span className="ml-auto">
                        <svg className="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                  </button>
                  {availableMembers.length > 0 && (
                    <div className="border-t border-gray-100" />
                  )}
                  {availableMembers.map((member) => (
                    <button
                      key={member.id}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                        bookFor === member.id ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => { setBookFor(member.id); setShowMemberPicker(false); }}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">
                        {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium">{member.name.split(' (')[0]}</span>
                        <span className="text-muted ml-1.5">({member.relationship})</span>
                      </div>
                      {bookFor === member.id && (
                        <span className="ml-auto">
                          <svg className="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {activeFamilyMember && bookFor === 'self' && (
            <p className="text-xs text-muted mt-2">
              You&apos;re currently managing {activeFamilyMember.name.split(' (')[0]}&apos;s health.{" "}
              <button
                className="text-primary-600 font-medium underline"
                onClick={() => { setBookFor(activeFamilyMember.id); setShowMemberPicker(false); }}
              >
                Book for them instead
              </button>
            </p>
          )}
        </div>
      </Card>

      {/* Date & Time */}
      <Card>
        <CardTitle className="mb-3">Appointment Details</CardTitle>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CalendarBlank size={18} className="text-primary-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">{formatDateLabel(date)}</p>
              <p className="text-xs text-muted">{date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-primary-600" />
            <p className="text-sm font-medium text-gray-900">{time}</p>
          </div>
          <div className="flex items-center gap-3">
            {type === 'telemedicine' ? (
              <VideoCamera size={18} className="text-blue-600" />
            ) : (
              <Building size={18} className="text-amber-600" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {type === 'telemedicine' ? 'Video Consultation' : 'In-Person Visit'}
              </p>
              <p className="text-xs text-muted">
                {type === 'telemedicine'
                  ? 'You will receive a video call link before the appointment'
                  : 'Visit the clinic at the scheduled time'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Fees */}
      <Card>
        <CardTitle className="mb-2">Consultation Fee</CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Consultation</span>
          <span className="text-lg font-bold text-gray-900">₹{provider.consultationFee}</span>
        </div>
        <p className="text-xs text-muted mt-2">
          Payment will be collected at the time of visit{type === 'telemedicine' ? '.' : ' or you can pay online.'}
        </p>
      </Card>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Add a note (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any specific concerns or information for the doctor..."
          className="input min-h-[80px] resize-none"
          rows={3}
        />
      </div>

      {/* Insurance note */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 text-blue-700 text-xs">
        <ShieldCheck size={16} className="shrink-0 mt-0.5" />
        <p>
          Your insurance information will be verified before the appointment. If you have a valid policy,
          coverage will be applied automatically.
        </p>
      </div>

      {/* Confirm button */}
      <Button
        className="w-full justify-center"
        size="lg"
        loading={bookMutation.isPending}
        onClick={handleConfirm}
      >
        Confirm Booking
      </Button>

      {bookMutation.isError && (
        <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          Failed to book appointment. Please try again.
        </div>
      )}
    </div>
  );
}
