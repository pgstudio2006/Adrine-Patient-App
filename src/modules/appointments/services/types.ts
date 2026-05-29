import type { Appointment, Provider, TimeSlot } from '../types';

export interface BookAppointmentData {
  providerId: string;
  patientId: string;
  patientName?: string;
  type: string;
  date: string;
  time: string;
  notes?: string;
}

export interface IAppointmentService {
  fetchAppointments(): Promise<Appointment[]>;
  fetchAppointmentById(id: string): Promise<Appointment | undefined>;
  fetchProviders(): Promise<Provider[]>;
  fetchProvidersBySpecialty(specialty: string): Promise<Provider[]>;
  fetchAvailableSlots(providerId: string, date: string): Promise<TimeSlot[]>;
  bookAppointment(data: BookAppointmentData): Promise<Appointment>;
  cancelAppointment(id: string): Promise<void>;
  rescheduleAppointment(id: string, date: string, time: string): Promise<Appointment | undefined>;
}

export type { Appointment, Provider, TimeSlot };
