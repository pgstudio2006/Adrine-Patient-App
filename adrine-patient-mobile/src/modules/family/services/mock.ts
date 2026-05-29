import type { FamilyMember, FamilyMemberStatus } from './types';

const MOCK_MEMBERS: FamilyMember[] = [
  {
    id: 'fam-1',
    patientId: 'patient-1',
    name: 'Alice Johnson',
    relationship: 'spouse',
    dateOfBirth: '1988-03-15',
    gender: 'female',
    bloodGroup: 'O+',
    status: 'active',
  },
  {
    id: 'fam-2',
    patientId: 'patient-2',
    name: 'Tommy Johnson',
    relationship: 'child',
    dateOfBirth: '2016-07-22',
    gender: 'male',
    bloodGroup: 'A+',
    status: 'active',
  },
  {
    id: 'fam-3',
    patientId: 'patient-3',
    name: 'Emma Johnson',
    relationship: 'child',
    dateOfBirth: '2019-11-08',
    gender: 'female',
    bloodGroup: 'A+',
    status: 'active',
  },
];

export class FamilyServiceMock {
  private members: FamilyMember[] = [...MOCK_MEMBERS];

  async getFamilyMembers(_patientId: string): Promise<FamilyMember[]> {
    return this.members;
  }

  async getFamilyMember(id: string): Promise<FamilyMember> {
    const member = this.members.find((m) => m.id === id);
    if (!member) throw new Error('Family member not found');
    return member;
  }

  async addFamilyMember(data: Omit<FamilyMember, 'id'>): Promise<FamilyMember> {
    const newMember: FamilyMember = {
      ...data,
      id: `fam-${Date.now()}`,
    };
    this.members.push(newMember);
    return newMember;
  }

  async updateFamilyMember(id: string, data: Partial<FamilyMember>): Promise<FamilyMember> {
    const idx = this.members.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Family member not found');
    this.members[idx] = { ...this.members[idx], ...data };
    return this.members[idx];
  }
}
