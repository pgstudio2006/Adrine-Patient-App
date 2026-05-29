import type { HealthRecord, RecordType } from './types';

const MOCK_RECORDS: HealthRecord[] = [
  {
    id: 'rec-1',
    patientId: 'patient-1',
    type: 'lab_result',
    title: 'Complete Blood Count (CBC)',
    description: 'Routine blood work results within normal range.',
    date: '2026-05-15T09:30:00Z',
    facility: 'City Diagnostic Lab',
    providerName: 'Dr. Sarah Chen',
    status: 'final',
    attachments: [{ name: 'cbc_report.pdf', url: '#', type: 'application/pdf' }],
    metadata: { hb: 14.2, wbc: 6.5, platelets: 250 },
  },
  {
    id: 'rec-2',
    patientId: 'patient-1',
    type: 'diagnosis',
    title: 'Seasonal Allergies',
    description: 'Patient presents with typical seasonal allergy symptoms. Prescribed antihistamines.',
    date: '2026-05-10T14:00:00Z',
    facility: 'Adrine Health Clinic',
    providerName: 'Dr. James Wilson',
    status: 'final',
  },
  {
    id: 'rec-3',
    patientId: 'patient-1',
    type: 'vitals',
    title: 'Annual Physical Vitals',
    description: 'Blood pressure: 120/80, Heart rate: 72 bpm, Temperature: 98.6°F',
    date: '2026-04-20T10:00:00Z',
    facility: 'Adrine Health Clinic',
    providerName: 'Dr. Sarah Chen',
    status: 'final',
    metadata: { bp_systolic: 120, bp_diastolic: 80, heart_rate: 72, temperature: 98.6 },
  },
  {
    id: 'rec-4',
    patientId: 'patient-1',
    type: 'immunization',
    title: 'COVID-19 Booster',
    description: 'Moderna COVID-19 bivalent booster administered.',
    date: '2026-03-01T11:00:00Z',
    facility: 'City Pharmacy',
    providerName: 'Nurse Rebecca',
    status: 'final',
  },
  {
    id: 'rec-5',
    patientId: 'patient-1',
    type: 'imaging',
    title: 'Chest X-Ray',
    description: 'No acute cardiopulmonary findings. Lungs are clear.',
    date: '2026-02-15T08:00:00Z',
    facility: 'City Diagnostic Lab',
    providerName: 'Dr. Michael Lee',
    status: 'final',
    attachments: [{ name: 'chest_xray.png', url: '#', type: 'image/png' }],
  },
];

export class RecordsServiceMock {
  private records: HealthRecord[] = [...MOCK_RECORDS];

  async getRecords(patientId: string, type?: string): Promise<HealthRecord[]> {
    let filtered = this.records.filter((r) => r.patientId === patientId);
    if (type) filtered = filtered.filter((r) => r.type === type);
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getRecord(id: string): Promise<HealthRecord> {
    const record = this.records.find((r) => r.id === id);
    if (!record) throw new Error('Record not found');
    return record;
  }
}
