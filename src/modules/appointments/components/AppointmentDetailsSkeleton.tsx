'use client';

import { Card } from '../../../design-system';

export function AppointmentDetailsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Back button placeholder */}
      <div className="w-10 h-10 rounded-full skeleton" />

      {/* Doctor card skeleton */}
      <Card padding="md">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full skeleton" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-44 skeleton" />
            <div className="h-4 w-28 skeleton" />
          </div>
        </div>
      </Card>

      {/* Date time skeleton */}
      <Card padding="md">
        <div className="h-4 w-24 skeleton mb-4" />
        <div className="space-y-3">
          <div className="h-11 skeleton" />
          <div className="h-11 skeleton" />
        </div>
      </Card>

      {/* Location skeleton */}
      <Card padding="md">
        <div className="h-4 w-20 skeleton mb-3" />
        <div className="h-10 skeleton" />
      </Card>

      {/* Preparation skeleton */}
      <Card padding="md">
        <div className="h-4 w-28 skeleton mb-3" />
        <div className="space-y-2">
          <div className="h-5 skeleton" />
          <div className="h-5 skeleton" />
        </div>
      </Card>
    </div>
  );
}
