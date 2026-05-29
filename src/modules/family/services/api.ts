import { domainBase, platformFetch } from '../../../runtime/platform-client';
import type { FamilyMember, FamilyInvite, CaregiverNote, HealthSummary } from '../types';
import type { IFamilyService } from './types';

/**
 * Real API implementation of IFamilyService.
 * Connects to the Adrine HIMS backend via the platform API gateway.
 */
export class ApiFamilyService implements IFamilyService {
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

  async fetchMembers(): Promise<FamilyMember[]> {
    return platformFetch<FamilyMember[]>(this.baseUrl, `/family/patient/${this.pid}/members`);
  }

  async fetchMemberById(id: string): Promise<FamilyMember | undefined> {
    try {
      return await platformFetch<FamilyMember>(this.baseUrl, `/family/patient/${this.pid}/members/${id}`);
    } catch {
      return undefined;
    }
  }

  async addMember(data: {
    name: string;
    relationship: string;
    role: string;
    age: number;
    gender: string;
    bloodGroup?: string;
    allergies?: string[];
    chronicConditions?: string[];
  }): Promise<FamilyMember> {
    return platformFetch<FamilyMember>(this.baseUrl, `/family/patient/${this.pid}/members`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMember(id: string, data: Partial<FamilyMember>): Promise<FamilyMember> {
    return platformFetch<FamilyMember>(this.baseUrl, `/family/patient/${this.pid}/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async removeMember(id: string): Promise<void> {
    await platformFetch<unknown>(this.baseUrl, `/family/patient/${this.pid}/members/${id}`, {
      method: 'DELETE',
    });
  }

  async updatePermissions(id: string, permissions: string[]): Promise<FamilyMember> {
    return platformFetch<FamilyMember>(this.baseUrl, `/family/patient/${this.pid}/members/${id}/permissions`, {
      method: 'PUT',
      body: JSON.stringify({ permissions }),
    });
  }

  async fetchHealthSummary(memberId: string): Promise<HealthSummary> {
    return platformFetch<HealthSummary>(this.baseUrl, `/family/patient/${this.pid}/members/${memberId}/health-summary`);
  }

  async fetchCaregiverNotes(memberId: string): Promise<CaregiverNote[]> {
    return platformFetch<CaregiverNote[]>(this.baseUrl, `/family/patient/${this.pid}/members/${memberId}/notes`);
  }

  async addCaregiverNote(data: { memberId: string; content: string; category: string }): Promise<CaregiverNote> {
    return platformFetch<CaregiverNote>(this.baseUrl, `/family/patient/${this.pid}/members/${data.memberId}/notes`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async sendInvite(invite: { name: string; relationship: string; role: string }): Promise<FamilyInvite> {
    return platformFetch<FamilyInvite>(this.baseUrl, `/family/patient/${this.pid}/invites`, {
      method: 'POST',
      body: JSON.stringify(invite),
    });
  }
}
