import type { LabReport, Prescription, HealthTimelineEvent, RecordDocument, LabParameter } from '../types';
import type { IRecordsService, RecordFilter } from './types';

// ─── Mock Lab Parameters ───────────────────────────
const CBP_PARAMETERS: LabParameter[] = [
  { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', referenceRange: '13.0–17.0', status: 'normal', trend: 'stable' },
  { name: 'WBC Count', value: '7,500', unit: '/µL', referenceRange: '4,500–11,000', status: 'normal', trend: 'stable' },
  { name: 'Platelets', value: '2,50,000', unit: '/µL', referenceRange: '1,50,000–4,50,000', status: 'normal', trend: 'stable' },
  { name: 'RBC Count', value: '5.1', unit: 'M/µL', referenceRange: '4.5–5.9', status: 'normal', trend: 'stable' },
  { name: 'Hematocrit', value: '42', unit: '%', referenceRange: '38–50', status: 'normal', trend: 'stable' },
  { name: 'MCV', value: '88', unit: 'fL', referenceRange: '80–100', status: 'normal', trend: 'stable' },
];

const LIPID_PARAMETERS: LabParameter[] = [
  { name: 'Total Cholesterol', value: '180', unit: 'mg/dL', referenceRange: '<200', status: 'normal', trend: 'improving', previousValue: '210' },
  { name: 'HDL Cholesterol', value: '52', unit: 'mg/dL', referenceRange: '>40', status: 'normal', trend: 'improving', previousValue: '48' },
  { name: 'LDL Cholesterol', value: '110', unit: 'mg/dL', referenceRange: '<130', status: 'normal', trend: 'improving', previousValue: '138' },
  { name: 'Triglycerides', value: '140', unit: 'mg/dL', referenceRange: '<150', status: 'normal', trend: 'stable' },
  { name: 'VLDL', value: '28', unit: 'mg/dL', referenceRange: '5–40', status: 'normal', trend: 'stable' },
  { name: 'TC/HDL Ratio', value: '3.5', unit: '', referenceRange: '<5.0', status: 'normal', trend: 'improving' },
];

const DIABETES_PARAMETERS: LabParameter[] = [
  { name: 'Fasting Glucose', value: '98', unit: 'mg/dL', referenceRange: '70–110', status: 'normal', trend: 'stable' },
  { name: 'HbA1c', value: '6.1', unit: '%', referenceRange: '<5.7', status: 'high', trend: 'worsening', previousValue: '5.8' },
  { name: 'Postprandial Glucose', value: '145', unit: 'mg/dL', referenceRange: '<140', status: 'high', trend: 'worsening' },
  { name: 'Serum Insulin', value: '12', unit: 'µIU/mL', referenceRange: '2–25', status: 'normal', trend: 'stable' },
];

const THYROID_PARAMETERS: LabParameter[] = [
  { name: 'TSH', value: '4.8', unit: 'µIU/mL', referenceRange: '0.5–5.0', status: 'normal', trend: 'stable' },
  { name: 'T3', value: '120', unit: 'ng/dL', referenceRange: '80–200', status: 'normal', trend: 'stable' },
  { name: 'T4', value: '7.5', unit: 'µg/dL', referenceRange: '5.5–11.0', status: 'normal', trend: 'stable' },
];

// ─── Mock Reports ───────────────────────────────────
const NOW = new Date();
function daysAgo(n: number): string {
  const d = new Date(NOW);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}
function daysFromNow(n: number): string {
  const d = new Date(NOW);
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

const MOCK_REPORTS: LabReport[] = [
  {
    id: 'rep-001',
    patientId: 'patient-1',
    type: 'lab_report',
    title: 'Lipid Profile',
    labName: 'City Diagnostic Lab',
    orderedBy: 'dr-patel',
    orderedByName: 'Dr. Amit Patel',
    orderedAt: daysAgo(5),
    collectedAt: daysAgo(4),
    completedAt: daysAgo(2),
    status: 'completed',
    category: 'Cardiology',
    parameters: LIPID_PARAMETERS,
    summary: 'All lipid parameters are within normal range. Total cholesterol has improved from 210 to 180 mg/dL compared to previous test.',
    aiInterpretation: 'Your cholesterol levels are looking good! The improvement in total cholesterol (down 14% from last test) and LDL suggests your lifestyle changes are working. Keep up the diet and exercise routine.',
    notes: 'Fasting sample. Patient was advised to continue current medication and diet.',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
  },
  {
    id: 'rep-002',
    patientId: 'patient-1',
    type: 'lab_report',
    title: 'Complete Blood Count (CBP)',
    labName: 'City Diagnostic Lab',
    orderedBy: 'dr-patel',
    orderedByName: 'Dr. Amit Patel',
    orderedAt: daysAgo(5),
    collectedAt: daysAgo(4),
    completedAt: daysAgo(2),
    status: 'completed',
    category: 'General Medicine',
    parameters: CBP_PARAMETERS,
    summary: 'All blood counts are within normal limits. No abnormalities detected.',
    notes: 'Routine annual checkup panel.',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
  },
  {
    id: 'rep-003',
    patientId: 'patient-1',
    type: 'lab_report',
    title: 'Diabetes Profile (HbA1c)',
    labName: 'MedLife Diagnostics',
    orderedBy: 'dr-sharma',
    orderedByName: 'Dr. Priya Sharma',
    orderedAt: daysAgo(10),
    collectedAt: daysAgo(9),
    completedAt: daysAgo(7),
    status: 'abnormal',
    category: 'Endocrinology',
    parameters: DIABETES_PARAMETERS,
    summary: 'HbA1c elevated at 6.1% (prediabetic range). Fasting glucose is normal. Postprandial glucose slightly elevated.',
    aiInterpretation: 'Your HbA1c has risen from 5.8% to 6.1% — this places you in the prediabetic range (5.7–6.4%). This is an early warning sign. Consider consulting your doctor about dietary modifications and increasing physical activity. Early intervention can help reverse this trend.',
    notes: 'Patient advised lifestyle modification and repeat test in 3 months.',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(7),
  },
  {
    id: 'rep-004',
    patientId: 'patient-1',
    type: 'lab_report',
    title: 'Thyroid Function Test',
    labName: 'MedLife Diagnostics',
    orderedBy: 'dr-verma',
    orderedByName: 'Dr. Sneha Verma',
    orderedAt: daysAgo(20),
    collectedAt: daysAgo(19),
    completedAt: daysAgo(17),
    status: 'completed',
    category: 'Endocrinology',
    parameters: THYROID_PARAMETERS,
    summary: 'Thyroid function is within normal range. TSH, T3, and T4 all normal.',
    notes: 'Routine monitoring for patient on thyroid medication.',
    createdAt: daysAgo(20),
    updatedAt: daysAgo(17),
  },
  {
    id: 'rep-005',
    patientId: 'patient-1',
    type: 'lab_report',
    title: 'Liver Function Test',
    labName: 'City Diagnostic Lab',
    orderedBy: 'dr-patel',
    orderedByName: 'Dr. Amit Patel',
    orderedAt: daysAgo(30),
    collectedAt: daysAgo(29),
    completedAt: daysAgo(27),
    status: 'processing',
    category: 'Gastroenterology',
    summary: 'Results pending.',
    notes: 'Annual health checkup panel.',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(27),
  },
  {
    id: 'rep-006',
    patientId: 'patient-1',
    type: 'imaging_report',
    title: 'Chest X-Ray',
    labName: 'Adrine Imaging Center',
    orderedBy: 'dr-patel',
    orderedByName: 'Dr. Amit Patel',
    orderedAt: daysAgo(45),
    collectedAt: daysAgo(44),
    completedAt: daysAgo(43),
    status: 'completed',
    category: 'Radiology',
    summary: 'Normal chest X-ray. No active cardiopulmonary abnormality. Heart size normal. Lungs clear.',
    createdAt: daysAgo(45),
    updatedAt: daysAgo(43),
  },
];

// ─── Mock Prescriptions ─────────────────────────────
const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-001',
    patientId: 'patient-1',
    providerId: 'dr-patel',
    providerName: 'Dr. Amit Patel',
    specialty: 'General Medicine',
    diagnosis: 'Seasonal allergies with upper respiratory symptoms',
    medications: [
      { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily at bedtime', duration: '14 days', route: 'Oral', instructions: 'Take before sleep. May cause drowsiness.', isActive: true },
      { name: 'Montelukast', dosage: '10mg', frequency: 'Once daily at bedtime', duration: '14 days', route: 'Oral', instructions: 'Take at same time daily.', isActive: true },
    ],
    status: 'active',
    priority: 'routine',
    notes: 'Review in 2 weeks if symptoms persist.',
    refillsRemaining: 1,
    expiresAt: daysFromNow(30),
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: 'rx-002',
    patientId: 'patient-1',
    providerId: 'dr-verma',
    providerName: 'Dr. Sneha Verma',
    specialty: 'Dermatology',
    diagnosis: 'Mild eczema on hands and forearms',
    medications: [
      { name: 'Hydrocortisone Cream 1%', dosage: 'Apply thin layer', frequency: 'Twice daily', duration: '10 days', route: 'Topical', instructions: 'Apply to affected areas only. Avoid broken skin.', isActive: true },
      { name: 'Moisturizing Lotion', dosage: 'Apply liberally', frequency: 'After every hand wash', duration: '30 days', route: 'Topical', instructions: 'Use as moisturizer to maintain skin barrier.', isActive: true },
    ],
    status: 'active',
    priority: 'routine',
    notes: 'Avoid harsh soaps. Use lukewarm water for washing.',
    refillsRemaining: 2,
    expiresAt: daysFromNow(90),
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
  },
  {
    id: 'rx-003',
    patientId: 'patient-1',
    providerId: 'dr-sharma',
    providerName: 'Dr. Priya Sharma',
    specialty: 'Cardiology',
    diagnosis: 'Essential Hypertension (Stage 1)',
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', route: 'Oral', instructions: 'Take in the morning. Monitor BP regularly.', isActive: true },
    ],
    status: 'active',
    priority: 'routine',
    notes: 'Follow up in 1 month for BP reassessment. Continue lifestyle modifications.',
    refillsRemaining: 3,
    expiresAt: daysFromNow(180),
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7),
  },
  {
    id: 'rx-004',
    patientId: 'patient-1',
    providerId: 'dr-khan',
    providerName: 'Dr. Imran Khan',
    specialty: 'Orthopedics',
    diagnosis: 'Acute lower back pain - Muscle spasm',
    medications: [
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily after meals', duration: '5 days', route: 'Oral', instructions: 'Take with food. Do not exceed 3 doses in 24 hours.', isActive: false },
      { name: 'Paracetamol + Muscle Relaxant', dosage: '500mg/325mg', frequency: 'Twice daily', duration: '5 days', route: 'Oral', instructions: 'Take after meals. May cause drowsiness.', isActive: false },
    ],
    status: 'completed',
    priority: 'routine',
    notes: 'Rest and hot compresses. Review if no improvement in 5 days.',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(55),
  },
  {
    id: 'rx-005',
    patientId: 'patient-1',
    providerId: 'dr-patel',
    providerName: 'Dr. Amit Patel',
    specialty: 'General Medicine',
    diagnosis: 'Vitamin D deficiency',
    medications: [
      { name: 'Vitamin D3', dosage: '60000 IU', frequency: 'Once weekly', duration: '8 weeks', route: 'Oral', instructions: 'Take with a fatty meal for better absorption.', isActive: true },
    ],
    status: 'active',
    priority: 'routine',
    refillsRemaining: 1,
    expiresAt: daysFromNow(60),
    createdAt: daysAgo(30),
    updatedAt: daysAgo(30),
  },
];

// ─── Mock Timeline ──────────────────────────────────
const MOCK_TIMELINE: HealthTimelineEvent[] = [
  { id: 'tl-001', type: 'lab_report', title: 'Lipid Profile Completed', description: 'Lipid profile results available from City Diagnostic Lab', date: daysAgo(2), providerName: 'Dr. Amit Patel', status: 'completed', source: 'lab', refId: 'rep-001' },
  { id: 'tl-002', type: 'prescription', title: 'Cetirizine Prescribed', description: 'Antihistamine prescribed for seasonal allergies', date: daysAgo(2), providerName: 'Dr. Amit Patel', status: 'active', source: 'provider', refId: 'rx-001' },
  { id: 'tl-003', type: 'lab_report', title: 'HbA1c Results Available', description: 'Diabetes profile shows elevated HbA1c at 6.1%', date: daysAgo(7), providerName: 'Dr. Priya Sharma', status: 'abnormal', source: 'lab', refId: 'rep-003' },
  { id: 'tl-004', type: 'prescription', title: 'Amlodipine Prescribed', description: 'BP medication for essential hypertension management', date: daysAgo(7), providerName: 'Dr. Priya Sharma', status: 'active', source: 'provider', refId: 'rx-003' },
  { id: 'tl-005', type: 'clinical_note', title: 'Follow-up Visit - Cardiology', description: 'BP check and medication review with Dr. Priya Sharma', date: daysAgo(7), providerName: 'Dr. Priya Sharma', status: 'completed', source: 'provider' },
  { id: 'tl-006', type: 'prescription', title: 'Hydrocortisone Cream Prescribed', description: 'Topical treatment for mild eczema on hands', date: daysAgo(5), providerName: 'Dr. Sneha Verma', status: 'active', source: 'provider', refId: 'rx-002' },
  { id: 'tl-007', type: 'lab_report', title: 'Thyroid Function Test Completed', description: 'Thyroid profile - all parameters normal', date: daysAgo(17), providerName: 'Dr. Sneha Verma', status: 'completed', source: 'lab', refId: 'rep-004' },
  { id: 'tl-008', type: 'lab_report', title: 'Chest X-Ray Completed', description: 'Normal chest X-ray - no abnormalities found', date: daysAgo(43), providerName: 'Dr. Amit Patel', status: 'completed', source: 'provider', refId: 'rep-006' },
];

// ─── Mock Documents ─────────────────────────────────
const MOCK_DOCUMENTS: RecordDocument[] = [
  { id: 'doc-001', patientId: 'patient-1', title: 'Previous Insurance Policy', category: 'document', fileType: 'application/pdf', fileSize: 2450000, uploadedAt: daysAgo(90), tags: ['insurance', 'policy'], notes: 'Previous year insurance policy document' },
  { id: 'doc-002', patientId: 'patient-1', title: 'Vaccination Certificate', category: 'vaccination', fileType: 'application/pdf', fileSize: 520000, uploadedAt: daysAgo(180), tags: ['vaccination', 'covid'], notes: 'COVID-19 vaccination certificate' },
];

// ─── Mock Service Implementation ────────────────────
export class MockRecordsService implements IRecordsService {
  async fetchReports(filter?: RecordFilter): Promise<LabReport[]> {
    await delay(350);
    let results = [...MOCK_REPORTS];
    if (filter?.status) {
      results = results.filter((r) => r.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.labName.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.orderedByName.toLowerCase().includes(q),
      );
    }
    return results.sort((a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime());
  }

  async fetchReportById(id: string): Promise<LabReport | undefined> {
    await delay(200);
    return MOCK_REPORTS.find((r) => r.id === id);
  }

  async fetchPrescriptions(filter?: RecordFilter): Promise<Prescription[]> {
    await delay(300);
    let results = [...MOCK_PRESCRIPTIONS];
    if (filter?.status) {
      results = results.filter((p) => p.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.providerName.toLowerCase().includes(q) ||
          p.diagnosis?.toLowerCase().includes(q) ||
          p.medications.some((m) => m.name.toLowerCase().includes(q)),
      );
    }
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async fetchPrescriptionById(id: string): Promise<Prescription | undefined> {
    await delay(200);
    return MOCK_PRESCRIPTIONS.find((p) => p.id === id);
  }

  async fetchTimeline(patientId: string): Promise<HealthTimelineEvent[]> {
    await delay(300);
    return MOCK_TIMELINE.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async fetchDocuments(): Promise<RecordDocument[]> {
    await delay(200);
    return MOCK_DOCUMENTS;
  }

  async uploadDocument(file: File, metadata: { title: string; category: string; notes?: string }): Promise<RecordDocument> {
    await delay(800);
    const newDoc: RecordDocument = {
      id: `doc-${Date.now()}`,
      patientId: 'patient-1',
      title: metadata.title,
      category: metadata.category as RecordDocument['category'],
      fileType: file.type,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      tags: [],
      notes: metadata.notes,
    };
    MOCK_DOCUMENTS.unshift(newDoc);
    return newDoc;
  }

  async searchRecords(query: string): Promise<(LabReport | Prescription)[]> {
    await delay(400);
    const q = query.toLowerCase();
    const reports = MOCK_REPORTS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.labName.toLowerCase().includes(q) ||
        r.orderedByName.toLowerCase().includes(q),
    );
    const prescriptions = MOCK_PRESCRIPTIONS.filter(
      (p) =>
        p.providerName.toLowerCase().includes(q) ||
        p.diagnosis?.toLowerCase().includes(q) ||
        p.medications.some((m) => m.name.toLowerCase().includes(q)),
    );
    return [...reports, ...prescriptions];
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
