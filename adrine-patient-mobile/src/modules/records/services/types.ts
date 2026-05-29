export type RecordType = 'lab_result' | 'diagnosis' | 'vitals' | 'imaging' | 'immunization' | 'surgery' | 'note';

export type RecordStatus = 'final' | 'preliminary' | 'amended' | 'cancelled';

export interface HealthRecord {
  id: string;
  patientId: string;
  type: RecordType;
  title: string;
  description?: string;
  date: string;
  facility?: string;
  providerName?: string;
  status: RecordStatus;
  attachments?: { name: string; url: string; type: string }[];
  metadata?: Record<string, any>;
}
