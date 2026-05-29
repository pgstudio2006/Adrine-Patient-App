import type { Appointment } from '../modules/appointments/types';
import type { FamilyMember } from '../modules/family/types';
import type { Record as HealthRecord } from '../modules/records/types';
import { PlatformApiError } from '../runtime/platform-client';

const BASE_URL = process.env.EXPO_PUBLIC_PLATFORM_API_URL || 'http://localhost:4000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) throw new PlatformApiError(`API error: ${res.status} ${res.statusText}`, res.status);
  return res.json();
}

export async function fetchAppointments(patientId: string): Promise<Appointment[]> {
  return request(`/appointments?patientId=${patientId}`);
}

export async function fetchFamilyMembers(patientId: string): Promise<FamilyMember[]> {
  return request(`/family?patientId=${patientId}`);
}

export async function fetchRecords(patientId: string, type?: string): Promise<HealthRecord[]> {
  const params = new URLSearchParams({ patientId });
  if (type) params.set('type', type);
  return request(`/records?${params}`);
}

export async function fetchRecord(id: string): Promise<HealthRecord> {
  return request(`/records/${id}`);
}
