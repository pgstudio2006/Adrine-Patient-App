'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MagnifyingGlass,
  Star,
  VideoCamera,
  MapPin,
  CalendarBlank,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, Badge, Button } from '../../../src/design-system';
import { useProviders } from '../../../src/modules/appointments/hooks';
import type { Provider } from '../../../src/modules/appointments/types';

const SPECIALTIES = [
  'All',
  'Cardiology',
  'General Medicine',
  'Dermatology',
  'Orthopedics',
  'Pediatrics',
  'Neurology',
  'ENT',
  'Ophthalmology',
  'Gynecology',
  'Psychiatry',
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const { data: providers, isLoading } = useProviders();
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const filteredProviders = (providers ?? []).filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === 'All' ||
      p.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/care" className="btn-ghost btn-icon rounded-full">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-sm text-muted">Choose a doctor or specialty</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search doctors or specialties..."
          className="input pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Specialty chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {SPECIALTIES.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSpecialty(s)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap
              ${selectedSpecialty === s
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Provider grid */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md">
              <div className="flex items-center gap-3 animate-pulse">
                <div className="w-14 h-14 rounded-full skeleton" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-36 skeleton" />
                  <div className="h-3 w-24 skeleton" />
                  <div className="h-3 w-20 skeleton" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : filteredProviders.length === 0 ? (
        <Card padding="lg">
          <div className="flex flex-col items-center text-center py-6">
            <MagnifyingGlass size={36} className="text-muted mb-3" />
            <h3 className="text-sm font-semibold text-gray-900">No doctors found</h3>
            <p className="text-xs text-muted mt-1">Try a different search or specialty</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} onSelect={() => {
              router.push(`/appointments/book/slots?providerId=${provider.id}`);
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProviderCard({ provider, onSelect }: { provider: Provider; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className="w-full text-left card-hover">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-lg font-bold shrink-0">
          {provider.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">{provider.name}</h3>
          <p className="text-xs text-muted">{provider.specialty} · {provider.qualification}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-xs text-amber-600">
              <Star size={12} weight="fill" />
              {provider.rating} ({provider.reviewCount})
            </span>
            <span className="text-xs text-muted">{provider.experience} yrs exp.</span>
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              ₹{provider.consultationFee}
            </span>
            {provider.telemedicineAvailable && (
              <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                <VideoCamera size={10} /> Tele
              </span>
            )}
            {provider.availableToday && (
              <Badge variant="success" dot>Available today</Badge>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
