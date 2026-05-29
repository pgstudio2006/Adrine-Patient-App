'use client';

import { Badge, type BadgeVariant } from './Badge';

type StatusMap = Record<string, { variant: BadgeVariant; label: string }>;

const appointmentStatuses: StatusMap = {
  scheduled: { variant: 'info', label: 'Scheduled' },
  confirmed: { variant: 'primary', label: 'Confirmed' },
  checked_in: { variant: 'warning', label: 'Checked In' },
  in_progress: { variant: 'primary', label: 'In Progress' },
  completed: { variant: 'success', label: 'Completed' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
  no_show: { variant: 'danger', label: 'No Show' },
};

const labStatuses: StatusMap = {
  ordered: { variant: 'info', label: 'Ordered' },
  sample_collected: { variant: 'warning', label: 'Sample Collected' },
  processing: { variant: 'primary', label: 'Processing' },
  completed: { variant: 'success', label: 'Completed' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
  abnormal: { variant: 'warning', label: 'Abnormal' },
};

const prescriptionStatuses: StatusMap = {
  active: { variant: 'primary', label: 'Active' },
  completed: { variant: 'success', label: 'Completed' },
  discontinued: { variant: 'danger', label: 'Discontinued' },
  on_hold: { variant: 'warning', label: 'On Hold' },
  expired: { variant: 'neutral', label: 'Expired' },
};

const paymentStatuses: StatusMap = {
  pending: { variant: 'warning', label: 'Pending' },
  paid: { variant: 'success', label: 'Paid' },
  failed: { variant: 'danger', label: 'Failed' },
  refunded: { variant: 'info', label: 'Refunded' },
  partially_paid: { variant: 'warning', label: 'Partially Paid' },
};

const defaultStatuses: StatusMap = {
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'neutral', label: 'Inactive' },
  pending: { variant: 'warning', label: 'Pending' },
  completed: { variant: 'success', label: 'Completed' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
  failed: { variant: 'danger', label: 'Failed' },
};

const domainMaps: Record<string, StatusMap> = {
  appointment: appointmentStatuses,
  lab: labStatuses,
  prescription: prescriptionStatuses,
  payment: paymentStatuses,
};

export interface StatusBadgeProps {
  status: string;
  domain?: 'appointment' | 'lab' | 'prescription' | 'payment';
  dot?: boolean;
}

export function StatusBadge({ status, domain, dot = true }: StatusBadgeProps) {
  const map = domain ? domainMaps[domain] : defaultStatuses;
  const mapped = map[status] ?? defaultStatuses[status] ?? { variant: 'neutral' as BadgeVariant, label: status };

  return (
    <Badge variant={mapped.variant} dot={dot}>
      {mapped.label}
    </Badge>
  );
}
