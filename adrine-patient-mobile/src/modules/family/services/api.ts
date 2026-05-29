import type { FamilyMember } from './types';
import { PlatformApiError } from '../../../runtime/platform-client';

export class FamilyServiceApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.EXPO_PUBLIC_PLATFORM_API_URL || 'http://localhost:4000/api';
  }

  async getFamilyMembers(patientId: string): Promise<FamilyMember[]> {
    const res = await fetch(`${this.baseUrl}/family?patientId=${patientId}`);
    if (!res.ok) throw new PlatformApiError('Failed to fetch family members', res.status);
    return res.json();
  }

  async getFamilyMember(id: string): Promise<FamilyMember> {
    const res = await fetch(`${this.baseUrl}/family/${id}`);
    if (!res.ok) throw new PlatformApiError('Failed to fetch family member', res.status);
    return res.json();
  }

  async addFamilyMember(data: Omit<FamilyMember, 'id'>): Promise<FamilyMember> {
    const res = await fetch(`${this.baseUrl}/family`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new PlatformApiError('Failed to add family member', res.status);
    return res.json();
  }

  async updateFamilyMember(id: string, data: Partial<FamilyMember>): Promise<FamilyMember> {
    const res = await fetch(`${this.baseUrl}/family/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new PlatformApiError('Failed to update family member', res.status);
    return res.json();
  }
}
