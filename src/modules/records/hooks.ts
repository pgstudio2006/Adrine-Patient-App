'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRecordsService } from '../../lib/service-registry';
import type { RecordFilter } from './services/types';

const service = getRecordsService();

const QUERY_KEYS = {
  reports: ['records', 'reports'] as const,
  reportsFiltered: (filter?: RecordFilter) => ['records', 'reports', filter] as const,
  report: (id: string) => ['records', 'reports', id] as const,
  prescriptions: ['records', 'prescriptions'] as const,
  prescriptionsFiltered: (filter?: RecordFilter) => ['records', 'prescriptions', filter] as const,
  prescription: (id: string) => ['records', 'prescriptions', id] as const,
  timeline: (patientId: string) => ['records', 'timeline', patientId] as const,
  documents: ['records', 'documents'] as const,
  search: (query: string) => ['records', 'search', query] as const,
};

export function useReports(filter?: RecordFilter) {
  return useQuery({
    queryKey: filter ? QUERY_KEYS.reportsFiltered(filter) : QUERY_KEYS.reports,
    queryFn: () => service.fetchReports(filter),
  });
}

export function useReport(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.report(id),
    queryFn: () => service.fetchReportById(id),
    enabled: !!id,
  });
}

export function usePrescriptions(filter?: RecordFilter) {
  return useQuery({
    queryKey: filter ? QUERY_KEYS.prescriptionsFiltered(filter) : QUERY_KEYS.prescriptions,
    queryFn: () => service.fetchPrescriptions(filter),
  });
}

export function usePrescription(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.prescription(id),
    queryFn: () => service.fetchPrescriptionById(id),
    enabled: !!id,
  });
}

export function useTimeline(patientId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.timeline(patientId),
    queryFn: () => service.fetchTimeline(patientId),
    enabled: !!patientId,
  });
}

export function useDocuments() {
  return useQuery({
    queryKey: QUERY_KEYS.documents,
    queryFn: () => service.fetchDocuments(),
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, metadata }: { file: File; metadata: { title: string; category: string; notes?: string } }) =>
      service.uploadDocument(file, metadata),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.documents });
    },
  });
}

export function useSearchRecords() {
  return useMutation({
    mutationFn: (query: string) => service.searchRecords(query),
  });
}
