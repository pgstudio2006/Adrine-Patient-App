import type { Appointment } from './types';
import { ApiAppointmentService } from './services/api';
import { MockAppointmentService } from './services/mock';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true' || !process.env.EXPO_PUBLIC_PLATFORM_API_URL;

export async function getAppointments(patientId: string): Promise<Appointment[]> {
  const service = USE_MOCK ? new MockAppointmentService() : new ApiAppointmentService(patientId);
  return service.fetchAppointments();
}

export async function getAppointmentById(id: string): Promise<Appointment | undefined> {
  const service = USE_MOCK ? new MockAppointmentService() : new ApiAppointmentService();
  return service.fetchAppointmentById(id);
}

export async function getAvailableSlots(params: { providerId: string; date: string; specialty?: string }): Promise<any[]> {
  const service = USE_MOCK ? new MockAppointmentService() : new ApiAppointmentService();
  return service.fetchAvailableSlots(params.providerId, params.date);
}

export async function bookAppointment(data: {
  patientId: string;
  providerId: string;
  slotId?: string;
  reason?: string;
  notes?: string;
}): Promise<Appointment> {
  const service = USE_MOCK ? new MockAppointmentService() : new ApiAppointmentService(data.patientId);
  return service.bookAppointment({
    providerId: data.providerId,
    patientId: data.patientId,
    patientName: 'You',
    type: 'in_person',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    notes: data.notes || data.reason,
  });
}
