'use client';

import Link from 'next/link';
import {
  CalendarCheck,
  VideoCamera,
  Flask,
  Basket,
  ArrowRight,
  Plus,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, CardContent } from '../../src/design-system';

const SECTIONS = [
  {
    icon: CalendarCheck,
    label: 'Appointments',
    description: 'Book and manage your visits',
    href: '/appointments',
    count: '2 upcoming',
    color: 'text-primary-600',
    bg: 'bg-primary-50',
  },
  {
    icon: VideoCamera,
    label: 'Telemedicine',
    description: 'Video consultations with doctors',
    href: '#',
    count: 'Available',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Flask,
    label: 'Labs & Diagnostics',
    description: 'View lab orders and results',
    href: '/reports',
    count: '3 reports',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Basket,
    label: 'Pharmacy',
    description: 'Order medications and refills',
    href: '/prescriptions',
    count: '2 active',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

export default function CarePage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Care</h1>
        <p className="text-sm text-muted mt-0.5">All your healthcare interactions</p>
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

      {/* Quick book button */}
      <div className="fixed bottom-24 right-5 z-40">
        <Link
          href="/appointments"
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
        >
          <Plus size={18} weight="bold" />
          <span className="text-sm font-medium">Book Appointment</span>
        </Link>
      </div>
    </div>
  );
}
