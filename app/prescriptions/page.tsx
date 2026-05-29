'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Pill,
  ArrowLeft,
  MagnifyingGlass,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, EmptyState, StatusBadge, Button } from '../../src/design-system';
import { usePrescriptions } from '../../src/modules/records/hooks';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function getMedicationCount(medications: unknown): string {
  if (!Array.isArray(medications)) return '—';
  return `${medications.length} med${medications.length !== 1 ? 's' : ''}`;
}

const STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function PrescriptionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { data: prescriptions, isLoading, error } = usePrescriptions(
    statusFilter ? { status: statusFilter, search: search || undefined } : search ? { search } : undefined,
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/records" className="btn-ghost btn-icon rounded-full">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-sm text-muted">Your medications and orders</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search prescriptions..."
          className="input pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status filter chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap
              ${statusFilter === f.value
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Card key={i} padding="md">
              <div className="space-y-2 animate-pulse">
                <div className="h-5 w-56 skeleton" />
                <div className="h-4 w-36 skeleton" />
                <div className="h-3 w-20 skeleton" />
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
            <p className="text-sm font-medium text-gray-900">Failed to load prescriptions</p>
            <Button variant="secondary" size="sm" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Card>
      ) : prescriptions?.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<Pill size={40} className="text-muted" />}
            title={search ? 'No matching prescriptions' : 'No prescriptions yet'}
            description={search ? 'Try a different search term' : 'Prescriptions from your visits will appear here.'}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {prescriptions?.map((rx) => {
            const isActive = rx.status === 'active';
            return (
              <Link key={rx.id} href={`/prescriptions/${rx.id}`}>
                <Card variant="hover" padding="md">
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-green-50' : 'bg-gray-50'
                    }`}>
                      <Pill size={20} className={isActive ? 'text-green-600' : 'text-gray-500'} weight="fill" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {rx.medications[0]?.name ?? 'Prescription'}
                        </h3>
                        <StatusBadge status={rx.status} domain="prescription" />
                      </div>
                      <p className="text-xs text-muted mt-0.5">
                        Dr. {rx.providerName} · {getMedicationCount(rx.medications)}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-600">{formatDate(rx.createdAt)}</span>
                        {rx.diagnosis && (
                          <span className="text-xs text-muted truncate max-w-[160px]">{rx.diagnosis}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
