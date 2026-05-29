import type { LabReport, Prescription, HealthTimelineEvent, RecordDocument } from '../types';

export interface RecordFilter {
  type?: string;
  status?: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
}

export interface IRecordsService {
  fetchReports(filter?: RecordFilter): Promise<LabReport[]>;
  fetchReportById(id: string): Promise<LabReport | undefined>;
  fetchPrescriptions(filter?: RecordFilter): Promise<Prescription[]>;
  fetchPrescriptionById(id: string): Promise<Prescription | undefined>;
  fetchTimeline(patientId: string): Promise<HealthTimelineEvent[]>;
  fetchDocuments(): Promise<RecordDocument[]>;
  uploadDocument(file: File, metadata: { title: string; category: string; notes?: string }): Promise<RecordDocument>;
  searchRecords(query: string): Promise<(LabReport | Prescription)[]>;
}
