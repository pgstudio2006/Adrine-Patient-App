'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Flask,
  ArrowLeft,
  MagnifyingGlass,
  FunnelSimple,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, EmptyState, StatusBadge, Button } from '../../src/design-system';
import { useReports } from '../../src/modules/records/hooks';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'processing', label: 'Processing' },
  { value: 'abnormal', label: 'Abnormal' },
];

export default function ReportsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { data: reports, isLoading, error } = useReports(
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
          <h1 className="text-xl font-bold text-gray-900">Lab Reports</h1>
          <p className="text-sm text-muted">Diagnostic orders and results</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search reports..."
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
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md">
              <div className="space-y-2 animate-pulse">
                <div className="h-5 w-44 skeleton" />
                <div className="h-4 w-32 skeleton" />
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
            <p className="text-sm font-medium text-gray-900">Failed to load reports</p>
            <Button variant="secondary" size="sm" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Card>
      ) : reports && reports.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<Flask size={40} className="text-muted" />}
            title={search ? 'No matching reports' : 'No lab reports yet'}
            description={search ? 'Try a different search term' : 'Lab reports from your visits will appear here.'}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {reports?.map((report) => (
            <Link key={report.id} href={`/reports/${report.id}`}>
              <Card variant="hover" padding="md">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    report.type === 'imaging_report' ? 'bg-blue-50' : 'bg-purple-50'
                  }`}>
                    {report.type === 'imaging_report'
                      ? <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      : <Flask size={20} className="text-purple-600" weight="fill" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{report.title}</h3>
                      <StatusBadge status={report.status} domain="lab" />
                    </div>
                    <p className="text-xs text-muted mt-0.5">{report.labName}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-600">{formatDate(report.orderedAt)}</span>
                      <span className="text-xs text-muted">{report.category}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
