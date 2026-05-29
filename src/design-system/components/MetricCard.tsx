'use client';

import { Card } from './Card';

export interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  change?: { value: string; direction: 'up' | 'down' | 'neutral' };
  icon?: React.ReactNode;
  status?: 'normal' | 'warning' | 'critical';
}

const statusColors = {
  normal: 'text-green-600',
  warning: 'text-amber-600',
  critical: 'text-red-600',
};

const statusBg = {
  normal: 'bg-green-50',
  warning: 'bg-amber-50',
  critical: 'bg-red-50',
};

export function MetricCard({ label, value, unit, change, icon, status }: MetricCardProps) {
  return (
    <Card padding="md" className={status ? `${statusBg[status]}` : ''}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted font-medium truncate">{label}</p>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className={`text-2xl font-bold ${status ? statusColors[status] : 'text-gray-900'}`}>
              {value}
            </span>
            {unit && <span className="text-xs text-muted">{unit}</span>}
          </div>
          {change && (
            <span
              className={`text-xs font-medium mt-0.5 inline-block ${
                change.direction === 'up'
                  ? 'text-green-600'
                  : change.direction === 'down'
                    ? 'text-red-600'
                    : 'text-muted'
              }`}
            >
              {change.direction === 'up' ? '↑' : change.direction === 'down' ? '↓' : '→'} {change.value}
            </span>
          )}
        </div>
        {icon && <div className="shrink-0 text-muted">{icon}</div>}
      </div>
    </Card>
  );
}
