import { domainBase } from '../../../runtime/platform-client';
import { platformFetch } from '../../../runtime/platform-client';
import type { Appointment, Provider, TimeSlot } from '../types';
import type { IAppointmentService, BookAppointmentData } from './types';

/**
 * Real API implementation of IAppointmentService.
 * Connects to the Adrine HIMS backend via the platform API gateway.
 *
 * Used when NEXT_PUBLIC_USE_REAL_API=true is set.
 */
export class ApiAppointmentService implements IAppointmentService {
  constructor(private readonly patientId?: string) {}

  private get baseUrl(): string {
    const url = domainBase();
    if (!url) throw new Error('NEXT_PUBLIC_DOMAIN_API_URL is not configured');
    return url;
  }

  private get pid(): string {
    if (!this.patientId) throw new Error('Patient ID is required for real API calls');
    return this.patientId;
  }

  async fetchAppointments(): Promise<Appointment[]> {
    return platformFetch<Appointment[]>(this.baseUrl, `/appointments/patient/${this.pid}`);
  }

  async fetchAppointmentById(id: string): Promise<Appointment | undefined> {
    try {
      return await platformFetch<Appointment>(this.baseUrl, `/appointments/${id}`);
    } catch {
      return undefined;
    }
  }

  async fetchProviders(): Promise<Provider[]> {
    return platformFetch<Provider[]>(this.baseUrl, '/providers');
  }

  async fetchProvidersBySpecialty(specialty: string): Promise<Provider[]> {
    const endpoint = specialty && specialty !== 'all'
      ? `/providers?specialty=${encodeURIComponent(specialty)}`
      : '/providers';
    return platformFetch<Provider[]>(this.baseUrl, endpoint);
  }

  async fetchAvailableSlots(providerId: string, date: string): Promise<TimeSlot[]> {
    const endpoint = `/providers/${providerId}/slots?date=${encodeURIComponent(date)}`;
    return platformFetch<TimeSlot[]>(this.baseUrl, endpoint);
  }

  async bookAppointment(data: BookAppointmentData): Promise<Appointment> {
    return platformFetch<Appointment>(this.baseUrl, '/appointments', {
      method: 'POST',
      body: JSON.stringify({
        patientId: this.pid,
        patientName: data.patientName,
        providerId: data.providerId,
        type: data.type,
        startAt: new Date(`${data.date}T${data.time}`).toISOString(),
        notes: data.notes,
      }),
    });
  }

  async cancelAppointment(id: string): Promise<void> {
    await platformFetch<unknown>(this.baseUrl, `/appointments/${id}/cancel`, {
      method: 'POST',
    });
  }

  async rescheduleAppointment(
    id: string,
    date: string,
    time: string,
  ): Promise<Appointment | undefined> {
    try {
      return await platformFetch<Appointment>(this.baseUrl, `/appointments/${id}/reschedule`, {
        method: 'POST',
        body: JSON.stringify({
          startAt: new Date(`${date}T${time}`).toISOString(),
        }),
      });
    } catch {
      return undefined;
    }
  }
}
