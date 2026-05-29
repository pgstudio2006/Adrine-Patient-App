'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFamilyService } from '../../lib/service-registry';

const service = getFamilyService();

const QUERY_KEYS = {
  members: ['family', 'members'] as const,
  member: (id: string) => ['family', 'members', id] as const,
  healthSummary: (memberId: string) => ['family', 'health-summary', memberId] as const,
  caregiverNotes: (memberId: string) => ['family', 'notes', memberId] as const,
};

export function useFamilyMembers() {
  return useQuery({
    queryKey: QUERY_KEYS.members,
    queryFn: () => service.fetchMembers(),
  });
}

export function useFamilyMember(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.member(id),
    queryFn: () => service.fetchMemberById(id),
    enabled: !!id,
  });
}

export function useAddFamilyMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      relationship: string;
      role: string;
      age: number;
      gender: string;
      bloodGroup?: string;
      allergies?: string[];
      chronicConditions?: string[];
    }) => service.addMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.members });
    },
  });
}

export function useRemoveFamilyMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => service.removeMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.members });
    },
  });
}

export function useUpdatePermissions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, permissions }: { id: string; permissions: string[] }) =>
      service.updatePermissions(id, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.members });
    },
  });
}

export function useHealthSummary(memberId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.healthSummary(memberId),
    queryFn: () => service.fetchHealthSummary(memberId),
    enabled: !!memberId,
  });
}

export function useCaregiverNotes(memberId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.caregiverNotes(memberId),
    queryFn: () => service.fetchCaregiverNotes(memberId),
    enabled: !!memberId,
  });
}

export function useAddCaregiverNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { memberId: string; content: string; category: string }) =>
      service.addCaregiverNote(data),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ['family', 'notes', _data.memberId] });
    },
  });
}
