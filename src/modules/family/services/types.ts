import type { FamilyMember, FamilyInvite, CaregiverNote, HealthSummary } from '../types';

export interface IFamilyService {
  fetchMembers(): Promise<FamilyMember[]>;
  fetchMemberById(id: string): Promise<FamilyMember | undefined>;
  addMember(data: {
    name: string;
    relationship: string;
    role: string;
    age: number;
    gender: string;
    bloodGroup?: string;
    allergies?: string[];
    chronicConditions?: string[];
  }): Promise<FamilyMember>;
  updateMember(id: string, data: Partial<FamilyMember>): Promise<FamilyMember>;
  removeMember(id: string): Promise<void>;
  updatePermissions(id: string, permissions: string[]): Promise<FamilyMember>;
  fetchHealthSummary(memberId: string): Promise<HealthSummary>;
  fetchCaregiverNotes(memberId: string): Promise<CaregiverNote[]>;
  addCaregiverNote(data: { memberId: string; content: string; category: string }): Promise<CaregiverNote>;
  sendInvite(data: { name: string; relationship: string; role: string }): Promise<FamilyInvite>;
}
