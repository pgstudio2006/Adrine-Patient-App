'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Flask,
  Building,
  CalendarBlank,
  Clock,
  UserCircle,
  Sparkle,
  FileText,
  DownloadSimple,
  ShareNetwork,
  ChartLineUp,
  SealWarning,
  CheckCircle,
  WarningCircle,
  Info,
} from '@phosphor-icons/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  StatusBadge,
  SectionHeader,
} from '../../../src/design-system';
import { useReport } from '../../../src/modules/records/hooks';
import type { LabParameter } from '../../../src/modules/records/types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });
}

function getParamStatusIcon(status: string) {
  switch (status) {
    case 'normal': return <CheckCircle size={14} className="text-green-600" weight="fill" />;
    case 'high':
    case 'low': return <WarningCircle size={14} className="text-amber-600" weight="fill" />;
    case 'critical': return <SealWarning size={14} className="text-red-600" weight="fill" />;
    default: return null;
  }
}

function getTrendIcon(trend?: string) {
  if (!trend || trend === 'stable') return null;
  return (
    <span className={`text-[10px] font-medium ${trend === 'improving' ? 'text-green-600' : 'text-red-600'}`}>
      {trend === 'improving' ? '↑' : '↓'} {trend}
    </span>
  );
}

export default function ReportDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: report, isLoading, error } = useReport(params.id);

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
                <div className="h-5 w-44 skeleton" />
                <div className="h-4 w-28 skeleton" />
              </div>
            </div>
            <div className="h-4 w-36 skeleton" />
            <div className="h-4 w-40 skeleton" />
            <div className="space-y-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 skeleton rounded-lg" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !report) {
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
            <h2 className="text-lg font-semibold text-gray-900">Report not found</h2>
            <p className="text-sm text-muted mt-1">This report may have been removed or doesn&apos;t exist.</p>
            <Link href="/reports" className="btn-primary mt-6">Back to Reports</Link>
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

      {/* Report header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
              report.type === 'imaging_report' ? 'bg-blue-50' : 'bg-purple-50'
            }`}>
              {report.type === 'imaging_report'
                ? <FileText size={24} className="text-blue-600" weight="fill" />
                : <Flask size={24} className="text-purple-600" weight="fill" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">{report.title}</h1>
              <p className="text-sm text-muted">{report.labName}</p>
            </div>
          </div>
          <StatusBadge status={report.status} domain="lab" />
        </CardHeader>
      </Card>

      {/* Quick info */}
      <Card>
        <CardTitle className="mb-3">Details</CardTitle>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <UserCircle size={18} className="text-muted" />
            <div>
              <p className="text-sm text-gray-700">Ordered by <span className="font-medium">{report.orderedByName}</span></p>
              <p className="text-xs text-muted">{report.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CalendarBlank size={18} className="text-muted" />
            <p className="text-sm text-gray-700">{formatDate(report.orderedAt)}</p>
          </div>
          {report.completedAt && (
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-muted" />
              <p className="text-sm text-gray-700">Completed: {formatDateTime(report.completedAt)}</p>
            </div>
          )}
          {report.collectedAt && (
            <div className="flex items-center gap-3">
              <Building size={18} className="text-muted" />
              <p className="text-sm text-gray-700">Collected at: {report.labName}</p>
            </div>
          )}
        </div>
      </Card>

      {/* AI Interpretation */}
      {report.aiInterpretation && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkle size={18} className="text-primary-600" weight="fill" />
              <CardTitle>AI Insights</CardTitle>
            </div>
            <Badge variant="info">Powered by AI</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 leading-relaxed">{report.aiInterpretation}</p>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {report.summary && (
        <Card padding="md" variant="flat">
          <div className="flex items-start gap-2">
            <Info size={18} className="text-primary-600 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{report.summary}</p>
          </div>
        </Card>
      )}

      {/* Parameters table */}
      {report.parameters && report.parameters.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ChartLineUp size={18} className="text-primary-600" />
              <CardTitle>Test Results</CardTitle>
            </div>
          </CardHeader>
          <div className="divide-y divide-gray-100 -mx-4 -mb-4">
            {report.parameters.map((param, idx) => (
              <div key={idx} className="px-4 py-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {getParamStatusIcon(param.status)}
                      <span className="text-sm font-medium text-gray-900">{param.name}</span>
                    </div>
                    {param.previousValue && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted">Previous: {param.previousValue}</span>
                        {getTrendIcon(param.trend)}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-sm font-semibold ${
                      param.status === 'normal' ? 'text-gray-900' :
                      param.status === 'critical' ? 'text-red-600' : 'text-amber-600'
                    }`}>
                      {param.value} <span className="text-xs font-normal text-muted">{param.unit}</span>
                    </span>
                    <p className="text-[10px] text-muted mt-0.5">Ref: {param.referenceRange}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Notes */}
      {report.notes && (
        <Card>
          <CardTitle className="mb-2">Notes</CardTitle>
          <p className="text-sm text-gray-700">{report.notes}</p>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="primary" className="flex-1 justify-center" icon={<DownloadSimple size={18} />}>
          Download PDF
        </Button>
        <Button variant="secondary" className="flex-1 justify-center" icon={<ShareNetwork size={18} />}>
          Share
        </Button>
      </div>
    </div>
  );
}
