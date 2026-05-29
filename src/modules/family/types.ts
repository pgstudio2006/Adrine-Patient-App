export type Relationship =
  | 'self'
  | 'spouse'
  | 'parent'
  | 'child'
  | 'sibling'
  | 'grandparent'
  | 'grandchild'
  | 'in_law'
  | 'professional_caregiver'
  | 'other';

export type FamilyRole =
  | 'primary_owner'
  | 'guardian'
  | 'caregiver'
  | 'family_member'
  | 'emergency_contact';

export type Permission =
  | 'view_records'
  | 'view_appointments'
  | 'book_appointments'
  | 'manage_medications'
  | 'view_bills'
  | 'make_payments'
  | 'receive_notifications'
  | 'manage_emergency_info'
  | 'upload_documents'
  | 'communicate_providers'
  | 'manage_insurance'
  | 'view_ai_insights'
  | 'full_access';

export interface FamilyMember {
  id: string;
  patientId: string;
  name: string;
  relationship: Relationship;
  role: FamilyRole;
  permissions: Permission[];
  status: 'active' | 'pending' | 'revoked';
  addedAt: string;
  consentType: 'explicit' | 'legal_guardian' | 'emergency' | 'professional';
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  allergies?: string[];
  chronicConditions?: string[];
  photoUrl?: string;
  lastActive?: string;
}

export interface FamilyInvite {
  id: string;
  invitedName: string;
  relationship: Relationship;
  role: FamilyRole;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  invitedAt: string;
  expiresAt: string;
}

export interface CaregiverNote {
  id: string;
  memberId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  category: 'medication' | 'symptom' | 'appointment' | 'general' | 'emergency';
}

export interface HealthSummary {
  memberId: string;
  upcomingAppointments: number;
  activeMedications: number;
  pendingReports: number;
  lastCheckup?: string;
  healthScore?: number;
  alerts: number;
}
