'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CalendarBlank,
  Clock,
  CheckCircle,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, Badge, Button } from '../../../../src/design-system';
import { useProviders, useAvailableSlots } from '../../../../src/modules/appointments/hooks';

// Generate next 14 days
function generateDates(): { label: string; date: string; dayOfWeek: string; isToday: boolean }[] {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    dates.push({
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      date: d.toISOString().split('T')[0],
      dayOfWeek: d.toLocaleDateString(undefined, { weekday: 'short' }),
      isToday: i === 0,
    });
  }
  return dates;
}

const APPOINTMENT_TYPES = [
  { value: 'in_person', label: 'In-Person Visit', desc: 'Visit the clinic/hospital' },
  { value: 'telemedicine', label: 'Telemedicine', desc: 'Video consultation from home' },
] as const;

export default function SlotPickerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get('providerId') ?? '';
  const { data: providers } = useProviders();
  const provider = providers?.find((p) => p.id === providerId);

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].date);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [apptType, setApptType] = useState<'in_person' | 'telemedicine'>('in_person');

  const { data: slots, isLoading: slotsLoading } = useAvailableSlots(providerId, selectedDate);

  if (!provider) {
    return (
      <div className="space-y-4">
        <Link href="/appointments/book" className="btn-ghost btn-icon rounded-full">
          <ArrowLeft size={20} />
        </Link>
        <Card padding="lg">
          <p className="text-sm text-muted text-center py-4">Provider not found. Please go back and select a doctor.</p>
        </Card>
      </div>
    );
  }

  const canProceed = selectedDate && selectedTime;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/appointments/book" className="btn-ghost btn-icon rounded-full">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Select Time</h1>
          <p className="text-sm text-muted">{provider.name} · {provider.specialty}</p>
        </div>
      </div>

      {/* Appointment type toggle */}
      <div className="grid grid-cols-2 gap-2">
        {APPOINTMENT_TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => setApptType(t.value)}
            className={`p-3 rounded-xl border text-left transition-all duration-150 ${
              apptType === t.value
                ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <p className="text-sm font-medium text-gray-900">{t.label}</p>
            <p className="text-xs text-muted mt-0.5">{t.desc}</p>
          </button>
        ))}
      </div>

      {/* Date selector */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Date</h2>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {dates.map((d) => (
            <button
              key={d.date}
              onClick={() => { setSelectedDate(d.date); setSelectedTime(null); }}
              className={`shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl border transition-all duration-150 min-w-[72px]
                ${selectedDate === d.date
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
            >
              <span className="text-[10px] font-medium uppercase">{d.dayOfWeek}</span>
              <span className={`text-sm font-semibold mt-0.5 ${selectedDate === d.date ? 'text-primary-700' : 'text-gray-900'}`}>
                {d.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Select Time</h2>
        {slotsLoading ? (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 skeleton rounded-lg" />
            ))}
          </div>
        ) : slots && slots.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.startTime}
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.startTime)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    selectedTime === slot.startTime
                      ? 'bg-primary-600 text-white shadow-sm ring-2 ring-primary-200'
                      : slot.available
                        ? 'bg-white border border-gray-200 text-gray-700 hover:border-primary-400 hover:text-primary-700'
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed line-through'
                  }`}
                >
                  {slot.startTime}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted mt-2">
              Showing available slots for {selectedDate}
            </p>
          </>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-xl">
            <Clock size={24} className="text-muted mx-auto mb-2" />
            <p className="text-sm text-muted">No slots available for this date</p>
          </div>
        )}
      </div>

      {/* Selected summary and proceed */}
      {canProceed && (
        <Card variant="flat" padding="md" className="animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-success shrink-0" weight="fill" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {provider.name}
              </p>
              <p className="text-xs text-muted">
                {selectedDate} · {selectedTime} · {apptType === 'telemedicine' ? 'Video' : 'In-person'}
              </p>
            </div>
            <Button
              onClick={() => {
                router.push(`/appointments/book/confirm?providerId=${providerId}&date=${selectedDate}&time=${selectedTime}&type=${apptType}`);
              }}
            >
              Continue
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
