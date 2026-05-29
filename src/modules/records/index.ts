export { type IRecordsService, type RecordFilter } from './services/types';
export { MockRecordsService } from './services/mock';
export { ApiRecordsService } from './services/api';
export { useReports, useReport, usePrescriptions, usePrescription, useTimeline, useDocuments, useUploadDocument, useSearchRecords } from './hooks';
export type { LabReport, Prescription, LabParameter, Medication, HealthTimelineEvent, RecordDocument, ReportStatus, PrescriptionStatus, RecordCategory } from './types';
