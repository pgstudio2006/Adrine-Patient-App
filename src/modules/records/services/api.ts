import { domainBase, platformFetch } from '../../../runtime/platform-client';
import type { LabReport, Prescription, HealthTimelineEvent, RecordDocument } from '../types';
import type { IRecordsService, RecordFilter } from './types';

/**
 * Real API implementation of IRecordsService.
 * Connects to the Adrine HIMS backend via the platform API gateway.
 *
 * Used when NEXT_PUBLIC_USE_REAL_API=true is set.
 */
export class ApiRecordsService implements IRecordsService {
  constructor(private readonly patientId?: string) {}

  private get baseUrl(): string {
    const url = domainBase();
    if (!url) throw new Error('NEXT_PUBLIC_DOMAIN_API_URL is not configured');
    return url;
  }

  private get pid(): string {
    if (!this.patientId) throw new Error('Patient ID is required for real API calls');
    return this.patientId;
  }

  async fetchReports(filter?: RecordFilter): Promise<LabReport[]> {
    const params = new URLSearchParams();
    if (filter?.status) params.set('status', filter.status);
    if (filter?.category) params.set('category', filter.category);
    if (filter?.search) params.set('search', filter.search);
    if (filter?.fromDate) params.set('from', filter.fromDate);
    if (filter?.toDate) params.set('to', filter.toDate);
    const qs = params.toString();
    return platformFetch<LabReport[]>(this.baseUrl, `/records/patient/${this.pid}/reports${qs ? `?${qs}` : ''}`);
  }

  async fetchReportById(id: string): Promise<LabReport | undefined> {
    try {
      return await platformFetch<LabReport>(this.baseUrl, `/records/reports/${id}`);
    } catch {
      return undefined;
    }
  }

  async fetchPrescriptions(filter?: RecordFilter): Promise<Prescription[]> {
    const params = new URLSearchParams();
    if (filter?.status) params.set('status', filter.status);
    if (filter?.search) params.set('search', filter.search);
    const qs = params.toString();
    return platformFetch<Prescription[]>(this.baseUrl, `/records/patient/${this.pid}/prescriptions${qs ? `?${qs}` : ''}`);
  }

  async fetchPrescriptionById(id: string): Promise<Prescription | undefined> {
    try {
      return await platformFetch<Prescription>(this.baseUrl, `/records/prescriptions/${id}`);
    } catch {
      return undefined;
    }
  }

  async fetchTimeline(patientId: string): Promise<HealthTimelineEvent[]> {
    return platformFetch<HealthTimelineEvent[]>(this.baseUrl, `/records/patient/${patientId}/timeline`);
  }

  async fetchDocuments(): Promise<RecordDocument[]> {
    return platformFetch<RecordDocument[]>(this.baseUrl, `/records/patient/${this.pid}/documents`);
  }

  async uploadDocument(file: File, metadata: { title: string; category: string; notes?: string }): Promise<RecordDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', metadata.title);
    formData.append('category', metadata.category);
    if (metadata.notes) formData.append('notes', metadata.notes);

    const response = await fetch(`${this.baseUrl}/records/patient/${this.pid}/documents`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  }

  async searchRecords(query: string): Promise<(LabReport | Prescription)[]> {
    return platformFetch<(LabReport | Prescription)[]>(
      this.baseUrl,
      `/records/patient/${this.pid}/search?q=${encodeURIComponent(query)}`,
    );
  }
}
