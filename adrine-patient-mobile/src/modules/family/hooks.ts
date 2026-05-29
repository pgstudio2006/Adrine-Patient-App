import { useQuery } from '@tanstack/react-query';
import type { FamilyMember } from './services/types';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true' || !process.env.EXPO_PUBLIC_PLATFORM_API_URL;

const mockMembers: FamilyMember[] = [
  { id: 'fam-1', patientId: 'patient-1', name: 'Alice Johnson', relationship: 'spouse', dateOfBirth: '1988-03-15', gender: 'female', bloodGroup: 'O+', status: 'active' },
  { id: 'fam-2', patientId: 'patient-2', name: 'Tommy Johnson', relationship: 'child', dateOfBirth: '2016-07-22', gender: 'male', bloodGroup: 'A+', status: 'active' },
  { id: 'fam-3', patientId: 'patient-3', name: 'Emma Johnson', relationship: 'child', dateOfBirth: '2019-11-08', gender: 'female', bloodGroup: 'A+', status: 'active' },
];

export function useFamilyMembers(patientId?: string) {
  const activePatientId = patientId || process.env.EXPO_PUBLIC_DEFAULT_PATIENT_ID || 'patient-default';

  return useQuery({
    queryKey: ['family-members', activePatientId],
    queryFn: async () => {
      if (USE_MOCK) return mockMembers;
      const { FamilyServiceApi } = await import('./services/api');
      const service = new FamilyServiceApi();
      return service.getFamilyMembers(activePatientId);
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useFamilyMember(id: string) {
  return useQuery({
    queryKey: ['family-member', id],
    queryFn: async () => {
      if (USE_MOCK) {
        const member = mockMembers.find((m) => m.id === id);
        if (!member) throw new Error('Family member not found');
        return member;
      }
      const { FamilyServiceApi } = await import('./services/api');
      const service = new FamilyServiceApi();
      return service.getFamilyMember(id);
    },
    enabled: !!id,
  });
}
