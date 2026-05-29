import type { HealthRecord } from './types';
import { PlatformApiError } from '../../../runtime/platform-client';

export class RecordsServiceApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.EXPO_PUBLIC_PLATFORM_API_URL || 'http://localhost:4000/api';
  }

  async getRecords(patientId: string, type?: string): Promise<HealthRecord[]> {
    const params = new URLSearchParams({ patientId });
    if (type) params.set('type', type);
    const res = await fetch(`${this.baseUrl}/records?${params}`);
    if (!res.ok) throw new PlatformApiError('Failed to fetch records', res.status);
    return res.json();
  }

  async getRecord(id: string): Promise<HealthRecord> {
    const res = await fetch(`${this.baseUrl}/records/${id}`);
    if (!res.ok) throw new PlatformApiError('Failed to fetch record', res.status);
    return res.json();
  }
}
