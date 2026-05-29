'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Pill,
  UserCircle,
  CalendarBlank,
  Clock,
  ClockCounterClockwise,
  ClipboardText,
  Sparkle,
  WarningCircle,
  CheckCircle,
  SealWarning,
  Building,
  Basket,
  Note,
} from '@phosphor-icons/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  StatusBadge,
} from '../../../src/design-system';
import { usePrescription } from '../../../src/modules/records/hooks';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });
}

function getMedicationIcon(index: number) {
  const colors = ['bg-primary-50 text-primary-600', 'bg-blue-50 text-blue-600', 'bg-amber-50 text-amber-600', 'bg-purple-50 text-purple-600', 'bg-green-50 text-green-600'];
  return colors[index % colors.length];
}

export default function PrescriptionDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: prescription, isLoading, error } = usePrescription(params.id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <button onClick={() => router.back()} className="btn-ghost btn-icon rounded-full" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <Card padding="lg">
          <div className="space-y-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full skeleton" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-48 skeleton" />
                <div className="h-4 w-32 skeleton" />
              </div>
            </div>
            <div className="h-4 w-36 skeleton" />
            <div className="space-y-3 mt-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 skeleton rounded-lg" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !prescription) {
    return (
      <div className="space-y-4">
        <button onClick={() => router.back()} className="btn-ghost btn-icon rounded-full" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <Card padding="lg">
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <SealWarning size={28} weight="fill" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Prescription not found</h2>
            <p className="text-sm text-muted mt-1">This prescription may have been removed or doesn&apos;t exist.</p>
            <Link href="/prescriptions" className="btn-primary mt-6">Back to Prescriptions</Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button onClick={() => router.back()} className="btn-ghost btn-icon rounded-full" aria-label="Go back">
        <ArrowLeft size={20} />
      </button>

      {/* Prescription header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
              prescription.status === 'active' ? 'bg-green-50' : 'bg-gray-50'
            }`}>
              <Pill size={24} className={
                prescription.status === 'active' ? 'text-green-600' : 'text-gray-500'
              } weight="fill" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">{prescription.medications[0]?.name ?? 'Prescription'}</h1>
              <p className="text-sm text-muted">
                {prescription.medications.length > 1 ? `+${prescription.medications.length - 1} more medications` : '1 medication'}
              </p>
            </div>
          </div>
          <StatusBadge status={prescription.status} domain="prescription" />
        </CardHeader>
      </Card>

      {/* Provider info */}
      <Card>
        <CardTitle className="mb-3">Prescribed By</CardTitle>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-base font-bold shrink-0">
            {prescription.providerName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{prescription.providerName}</p>
            <p className="text-xs text-muted">{prescription.specialty}</p>
            <p className="text-xs text-muted mt-0.5">Prescribed on {formatDate(prescription.createdAt)}</p>
          </div>
        </div>
      </Card>

      {/* Diagnosis */}
      {prescription.diagnosis && (
        <Card padding="md" variant="flat">
          <div className="flex items-start gap-2">
            <ClipboardText size={18} className="text-primary-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-semibold">Diagnosis</p>
              <p className="text-sm text-gray-900 mt-0.5">{prescription.diagnosis}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Medications */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Pill size={18} className="text-primary-600" weight="fill" />
          <CardTitle>Medications ({prescription.medications.length})</CardTitle>
        </div>
        <div className="space-y-3">
          {prescription.medications.map((med, idx) => (
            <div key={idx} className={`p-3 rounded-xl border ${
              med.isActive ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${getMedicationIcon(idx)}`}>
                  <Pill size={16} weight="fill" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900">{med.name}</h3>
                    {!med.isActive && (
                      <Badge variant="neutral">Discontinued</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1.5">
                    <div>
                      <span className="text-[10px] text-muted uppercase">Dosage</span>
                      <p className="text-xs font-medium text-gray-700">{med.dosage}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted uppercase">Route</span>
                      <p className="text-xs font-medium text-gray-700">{med.route}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted uppercase">Frequency</span>
                      <p className="text-xs font-medium text-gray-700">{med.frequency}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted uppercase">Duration</span>
                      <p className="text-xs font-medium text-gray-700">{med.duration}</p>
                    </div>
                  </div>
                  {med.instructions && (
                    <div className="flex items-start gap-1.5 mt-2 p-2 rounded-lg bg-amber-50">
                      <WarningCircle size={12} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-800">{med.instructions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Refill & Expiry */}
      {(prescription.refillsRemaining !== undefined || prescription.expiresAt) && (
        <Card>
          <CardTitle className="mb-3">Refill Information</CardTitle>
          <div className="space-y-3">
            {prescription.refillsRemaining !== undefined && (
              <div className="flex items-center gap-3">
                <ClockCounterClockwise size={18} className="text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {prescription.refillsRemaining} refill{prescription.refillsRemaining !== 1 ? 's' : ''} remaining
                  </p>
                  {prescription.refillsRemaining > 0 && (
                    <p className="text-xs text-muted">You can reorder without a new prescription</p>
                  )}
                </div>
              </div>
            )}
            {prescription.expiresAt && (
              <div className="flex items-center gap-3">
                <CalendarBlank size={18} className="text-muted" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Expires: {formatDate(prescription.expiresAt)}</p>
                  <p className="text-xs text-muted">
                    {new Date(prescription.expiresAt) > new Date()
                      ? `${Math.ceil((new Date(prescription.expiresAt).getTime() - Date.now()) / 86400000)} days remaining`
                      : 'This prescription has expired'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Notes */}
      {prescription.notes && (
        <Card>
          <CardHeader>
            <Note size={18} className="text-muted" />
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{prescription.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {prescription.status === 'active' && (
        <div className="flex gap-3 pt-2">
          <Button variant="primary" className="flex-1 justify-center" icon={<Basket size={18} />}>
            Order Refill
          </Button>
          <Button variant="secondary" className="flex-1 justify-center" icon={<ClockCounterClockwise size={18} />}>
            Set Reminder
          </Button>
        </div>
      )}
    </div>
  );
}
