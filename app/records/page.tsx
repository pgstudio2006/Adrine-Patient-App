'use client';

import Link from 'next/link';
import {
  FileText,
  Pill,
  ClockCounterClockwise,
  FolderOpen,
  ArrowRight,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, EmptyState } from '../../src/design-system';

const SECTIONS = [
  {
    icon: FileText,
    label: 'Lab Reports',
    description: 'Diagnostic reports and results',
    href: '/reports',
    count: '12 reports',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Pill,
    label: 'Prescriptions',
    description: 'Active and past prescriptions',
    href: '/prescriptions',
    count: '2 active',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: ClockCounterClockwise,
    label: 'Health Timeline',
    description: 'Your complete health history',
    href: '#',
    count: 'Coming soon',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: FolderOpen,
    label: 'Documents',
    description: 'Uploaded records and files',
    href: '#',
    count: 'Coming soon',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
];

export default function RecordsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Records</h1>
        <p className="text-sm text-muted mt-0.5">Your health information vault</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.label} href={section.href}>
              <Card variant="interactive" padding="md">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${section.bg}`}>
                    <Icon size={24} weight="fill" className={section.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">{section.label}</h3>
                      <span className="text-[10px] font-medium text-muted bg-gray-100 px-2 py-0.5 rounded-full">
                        {section.count}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">{section.description}</p>
                  </div>
                  <ArrowRight size={18} className="text-muted shrink-0" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* AI-powered search placeholder */}
      <Card variant="flat" padding="lg">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Search your records</h3>
          <p className="text-xs text-muted mt-1 max-w-xs">
            AI-powered search across all your reports, prescriptions, and documents
          </p>
          <div className="mt-4 w-full max-w-sm">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search records, medications..."
                className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500"
                readOnly
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
