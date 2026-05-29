export type FamilyMemberStatus = 'active' | 'inactive' | 'pending';

export interface FamilyMember {
  id: string;
  patientId: string;
  name: string;
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  dateOfBirth: string;
  gender: string;
  bloodGroup?: string;
  status: FamilyMemberStatus;
  avatarUrl?: string;
}
