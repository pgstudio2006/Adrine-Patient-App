import type { FamilyMember, FamilyInvite, CaregiverNote, HealthSummary } from '../types';
import type { IFamilyService } from './types';

// ─── Mock Family Members ─────────────────────────────
const NOW = new Date();
function daysAgo(n: number): string {
  const d = new Date(NOW);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

const MOCK_MEMBERS: FamilyMember[] = [
  {
    id: 'self',
    patientId: 'patient-1',
    name: 'You (Primary)',
    relationship: 'self',
    role: 'primary_owner',
    permissions: ['full_access'],
    status: 'active',
    addedAt: daysAgo(365),
    consentType: 'explicit',
    age: 32,
    gender: 'male',
    bloodGroup: 'O+',
    allergies: ['Pollen', 'Dust'],
    chronicConditions: ['Mild Hypertension'],
    lastActive: daysAgo(0),
  },
  {
    id: 'member-1',
    patientId: 'patient-father',
    name: 'Rajesh Sharma',
    relationship: 'parent',
    role: 'guardian',
    permissions: ['view_records', 'view_appointments', 'book_appointments', 'manage_medications', 'receive_notifications', 'manage_emergency_info', 'view_ai_insights'],
    status: 'active',
    addedAt: daysAgo(200),
    consentType: 'explicit',
    age: 62,
    gender: 'male',
    bloodGroup: 'B+',
    allergies: ['Shellfish'],
    chronicConditions: ['Diabetes Type 2', 'Hypertension'],
    lastActive: daysAgo(1),
  },
  {
    id: 'member-2',
    patientId: 'patient-mother',
    name: 'Sunita Sharma',
    relationship: 'parent',
    role: 'guardian',
    permissions: ['view_records', 'view_appointments', 'receive_notifications', 'manage_emergency_info'],
    status: 'active',
    addedAt: daysAgo(200),
    consentType: 'explicit',
    age: 58,
    gender: 'female',
    bloodGroup: 'A+',
    chronicConditions: ['Arthritis'],
    lastActive: daysAgo(3),
  },
  {
    id: 'member-3',
    patientId: 'patient-son',
    name: 'Arjun (Son)',
    relationship: 'child',
    role: 'guardian',
    permissions: ['full_access'],
    status: 'active',
    addedAt: daysAgo(100),
    consentType: 'legal_guardian',
    age: 8,
    gender: 'male',
    bloodGroup: 'O+',
    allergies: ['Peanuts', 'Eggs'],
    lastActive: daysAgo(2),
  },
  {
    id: 'member-4',
    patientId: 'patient-nurse',
    name: 'Priya Nair (Nurse)',
    relationship: 'professional_caregiver',
    role: 'caregiver',
    permissions: ['view_records', 'view_appointments', 'manage_medications', 'receive_notifications', 'upload_documents'],
    status: 'active',
    addedAt: daysAgo(30),
    consentType: 'professional',
    age: 35,
    gender: 'female',
    lastActive: daysAgo(0),
  },
  {
    id: 'member-5',
    patientId: 'patient-sister',
    name: 'Anita Sharma',
    relationship: 'sibling',
    role: 'family_member',
    permissions: ['view_records', 'view_appointments', 'receive_notifications'],
    status: 'pending',
    addedAt: daysAgo(5),
    consentType: 'explicit',
    age: 28,
    gender: 'female',
  },
];

// ─── Mock Health Summaries ──────────────────────────
const MOCK_HEALTH_SUMMARIES: Record<string, HealthSummary> = {
  'member-1': {
    memberId: 'member-1',
    upcomingAppointments: 1,
    activeMedications: 3,
    pendingReports: 2,
    lastCheckup: daysAgo(15),
    healthScore: 72,
    alerts: 1,
  },
  'member-2': {
    memberId: 'member-2',
    upcomingAppointments: 0,
    activeMedications: 1,
    pendingReports: 0,
    lastCheckup: daysAgo(60),
    healthScore: 85,
    alerts: 0,
  },
  'member-3': {
    memberId: 'member-3',
    upcomingAppointments: 2,
    activeMedications: 0,
    pendingReports: 0,
    lastCheckup: daysAgo(20),
    healthScore: 95,
    alerts: 0,
  },
  'member-4': {
    memberId: 'member-4',
    upcomingAppointments: 0,
    activeMedications: 0,
    pendingReports: 0,
    alerts: 0,
  },
};

// ─── Mock Caregiver Notes ──────────────────────────
const MOCK_NOTES: CaregiverNote[] = [
  {
    id: 'note-1',
    memberId: 'member-1',
    authorId: 'self',
    authorName: 'You (Primary)',
    content: 'Father took his morning medication on time. BP was 138/85.',
    createdAt: daysAgo(0),
    category: 'medication',
  },
  {
    id: 'note-2',
    memberId: 'member-1',
    authorId: 'member-4',
    authorName: 'Priya Nair (Nurse)',
    content: 'Patient complained of mild dizziness this morning. BP checked: 142/90. Advised to rest and monitor.',
    createdAt: daysAgo(1),
    category: 'symptom',
  },
  {
    id: 'note-3',
    memberId: 'member-3',
    authorId: 'self',
    authorName: 'You (Primary)',
    content: 'Arjun has a small rash on his arm. Applied calamine lotion. Monitoring.',
    createdAt: daysAgo(2),
    category: 'symptom',
  },
  {
    id: 'note-4',
    memberId: 'member-1',
    authorId: 'self',
    authorName: 'You (Primary)',
    content: 'Reminder: Father has endocrinology follow-up next week.',
    createdAt: daysAgo(3),
    category: 'appointment',
  },
];

// ─── Mock Invites ───────────────────────────────────
const MOCK_INVITES: FamilyInvite[] = [
  {
    id: 'inv-1',
    invitedName: 'Anita Sharma',
    relationship: 'sibling',
    role: 'family_member',
    status: 'pending',
    invitedAt: daysAgo(5),
    expiresAt: daysAgo(30),
  },
];

// ─── Mock Service Implementation ────────────────────
export class MockFamilyService implements IFamilyService {
  async fetchMembers(): Promise<FamilyMember[]> {
    await delay(300);
    return [...MOCK_MEMBERS].sort((a, b) => {
      if (a.relationship === 'self') return -1;
      if (b.relationship === 'self') return 1;
      return a.name.localeCompare(b.name);
    });
  }

  async fetchMemberById(id: string): Promise<FamilyMember | undefined> {
    await delay(200);
    return MOCK_MEMBERS.find((m) => m.id === id);
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
    await delay(500);
    const newMember: FamilyMember = {
      id: `member-${Date.now()}`,
      patientId: `patient-${Date.now()}`,
      name: data.name,
      relationship: data.relationship as FamilyMember['relationship'],
      role: data.role as FamilyMember['role'],
      permissions: ['view_records', 'view_appointments'],
      status: 'pending',
      addedAt: new Date().toISOString(),
      consentType: 'explicit',
      age: data.age,
      gender: data.gender as FamilyMember['gender'],
      bloodGroup: data.bloodGroup,
      allergies: data.allergies,
      chronicConditions: data.chronicConditions,
    };
    MOCK_MEMBERS.push(newMember);
    return newMember;
  }

  async updateMember(id: string, data: Partial<FamilyMember>): Promise<FamilyMember> {
    await delay(300);
    const idx = MOCK_MEMBERS.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Member not found');
    MOCK_MEMBERS[idx] = { ...MOCK_MEMBERS[idx], ...data };
    return MOCK_MEMBERS[idx];
  }

  async removeMember(id: string): Promise<void> {
    await delay(300);
    const idx = MOCK_MEMBERS.findIndex((m) => m.id === id);
    if (idx !== -1) MOCK_MEMBERS.splice(idx, 1);
  }

  async updatePermissions(id: string, permissions: string[]): Promise<FamilyMember> {
    await delay(300);
    const member = MOCK_MEMBERS.find((m) => m.id === id);
    if (member) {
      member.permissions = permissions as FamilyMember['permissions'];
    }
    if (!member) throw new Error('Member not found');
    return member;
  }

  async fetchHealthSummary(memberId: string): Promise<HealthSummary> {
    await delay(200);
    return MOCK_HEALTH_SUMMARIES[memberId] ?? {
      memberId,
      upcomingAppointments: 0,
      activeMedications: 0,
      pendingReports: 0,
      alerts: 0,
    };
  }

  async fetchCaregiverNotes(memberId: string): Promise<CaregiverNote[]> {
    await delay(200);
    return MOCK_NOTES.filter((n) => n.memberId === memberId).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async addCaregiverNote(data: { memberId: string; content: string; category: string }): Promise<CaregiverNote> {
    await delay(300);
    const note: CaregiverNote = {
      id: `note-${Date.now()}`,
      memberId: data.memberId,
      authorId: 'self',
      authorName: 'You (Primary)',
      content: data.content,
      createdAt: new Date().toISOString(),
      category: data.category as CaregiverNote['category'],
    };
    MOCK_NOTES.unshift(note);
    return note;
  }

  async sendInvite(invite: { name: string; relationship: string; role: string }): Promise<FamilyInvite> {
    await delay(400);
    const newInvite: FamilyInvite = {
      id: `inv-${Date.now()}`,
      invitedName: invite.name,
      relationship: invite.relationship as FamilyInvite['relationship'],
      role: invite.role as FamilyInvite['role'],
      status: 'pending',
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    };
    MOCK_INVITES.unshift(newInvite);
    return newInvite;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
