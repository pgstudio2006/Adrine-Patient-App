export type ReportStatus =
  | 'ordered'
  | 'sample_collected'
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'abnormal';

export type PrescriptionStatus =
  | 'active'
  | 'completed'
  | 'discontinued'
  | 'on_hold'
  | 'expired';

export type RecordCategory =
  | 'lab_report'
  | 'imaging_report'
  | 'prescription'
  | 'discharge_summary'
  | 'clinical_note'
  | 'vaccination'
  | 'document';

export interface LabParameter {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  trend?: 'stable' | 'improving' | 'worsening' | 'new';
  previousValue?: string;
}

export interface LabReport {
  id: string;
  patientId: string;
  type: 'lab_report' | 'imaging_report';
  title: string;
  labName: string;
  orderedBy: string;
  orderedByName: string;
  orderedAt: string;
  collectedAt?: string;
  completedAt?: string;
  status: ReportStatus;
  category: string;
  parameters?: LabParameter[];
  summary?: string;
  aiInterpretation?: string;
  notes?: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  instructions?: string;
  isActive: boolean;
}

export interface Prescription {
  id: string;
  patientId: string;
  providerId: string;
  providerName: string;
  specialty: string;
  diagnosis?: string;
  medications: Medication[];
  status: PrescriptionStatus;
  priority?: 'routine' | 'urgent';
  notes?: string;
  refillsRemaining?: number;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HealthTimelineEvent {
  id: string;
  type: RecordCategory;
  title: string;
  description: string;
  date: string;
  providerName?: string;
  status?: string;
  source: 'provider' | 'lab' | 'pharmacy' | 'self';
  refId?: string;
}

export interface RecordDocument {
  id: string;
  patientId: string;
  title: string;
  category: RecordCategory;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  tags: string[];
  notes?: string;
}
