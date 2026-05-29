import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Appointment } from './types';
import { MockAppointmentService } from './services/mock';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true' || !process.env.EXPO_PUBLIC_PLATFORM_API_URL;

const mockService = new MockAppointmentService();

async function fetchAppointments(): Promise<Appointment[]> {
  if (USE_MOCK) return mockService.fetchAppointments();
  const { ApiAppointmentService } = await import('./services/api');
  const patientId = process.env.EXPO_PUBLIC_DEFAULT_PATIENT_ID || 'patient-default';
  const service = new ApiAppointmentService(patientId);
  return service.fetchAppointments();
}

const QUERY_KEYS = {
  appointments: ['appointments'] as const,
};

export function useAppointments() {
  return useQuery({
    queryKey: QUERY_KEYS.appointments,
    queryFn: fetchAppointments,
    staleTime: 2 * 60 * 1000,
  });
}
