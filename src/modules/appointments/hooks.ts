'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppointmentService } from '../../lib/service-registry';
import type { Appointment } from './types';

const service = getAppointmentService();

const QUERY_KEYS = {
  appointments: ['appointments'] as const,
  appointment: (id: string) => ['appointments', id] as const,
  providers: ['providers'] as const,
  providersBySpecialty: (specialty: string) => ['providers', 'specialty', specialty] as const,
  slots: (providerId: string, date: string) => ['slots', providerId, date] as const,
};

export function useAppointments() {
  return useQuery({
    queryKey: QUERY_KEYS.appointments,
    queryFn: () => service.fetchAppointments(),
  });
}

export function useAppointment(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.appointment(id),
    queryFn: () => service.fetchAppointmentById(id),
    enabled: !!id,
  });
}

export function useProviders() {
  return useQuery({
    queryKey: QUERY_KEYS.providers,
    queryFn: () => service.fetchProviders(),
  });
}

export function useProvidersBySpecialty(specialty: string) {
  return useQuery({
    queryKey: QUERY_KEYS.providersBySpecialty(specialty),
    queryFn: () => service.fetchProvidersBySpecialty(specialty),
    enabled: specialty !== undefined,
  });
}

export function useAvailableSlots(providerId: string, date: string) {
  return useQuery({
    queryKey: QUERY_KEYS.slots(providerId, date),
    queryFn: () => service.fetchAvailableSlots(providerId, date),
    enabled: !!providerId && !!date,
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      providerId: string;
      patientId: string;
      patientName?: string;
      type: string;
      date: string;
      time: string;
      notes?: string;
    }) => service.bookAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.appointments });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => service.cancelAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.appointments });
    },
  });
}

export function useRescheduleAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, date, time }: { id: string; date: string; time: string }) =>
      service.rescheduleAppointment(id, date, time),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.appointments });
    },
  });
}
