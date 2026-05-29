import type { IAppointmentService } from '../modules/appointments/services/types';
import { MockAppointmentService } from '../modules/appointments/services/mock';
import { ApiAppointmentService } from '../modules/appointments/services/api';

import type { IRecordsService } from '../modules/records/services/types';
import { MockRecordsService } from '../modules/records/services/mock';
import { ApiRecordsService } from '../modules/records/services/api';

import type { IFamilyService } from '../modules/family/services/types';
import { MockFamilyService } from '../modules/family/services/mock';
import { ApiFamilyService } from '../modules/family/services/api';

import { getPlatformSession } from '../runtime/platform-session';

/**
 * Service registry — the single point of control for swapping mock ↔ real APIs.
 *
 * To connect with the real Adrine HIMS backend, set:
 *   NEXT_PUBLIC_USE_REAL_API=true
 *   NEXT_PUBLIC_DOMAIN_API_URL=<your-api-base-url>
 *   NEXT_PUBLIC_KERNEL_API_URL=<your-kernel-url>
 *
 * The registry reads the env var once and returns the correct implementation.
 */

function isRealApiEnabled(): boolean {
  return process.env.NEXT_PUBLIC_USE_REAL_API === 'true';
}

function getPatientId(): string | undefined {
  const session = getPlatformSession();
  return session?.patientId;
}

// ─── Singleton cache ─────────────────────────────────
let appointmentService: IAppointmentService | null = null;
let recordsService: IRecordsService | null = null;
let familyService: IFamilyService | null = null;

/**
 * Returns the configured IAppointmentService singleton.
 */
export function getAppointmentService(): IAppointmentService {
  if (appointmentService) return appointmentService;
  if (isRealApiEnabled()) {
    appointmentService = new ApiAppointmentService(getPatientId());
  } else {
    appointmentService = new MockAppointmentService();
  }
  return appointmentService;
}

/**
 * Returns the configured IRecordsService singleton.
 */
export function getRecordsService(): IRecordsService {
  if (recordsService) return recordsService;
  if (isRealApiEnabled()) {
    recordsService = new ApiRecordsService(getPatientId());
  } else {
    recordsService = new MockRecordsService();
  }
  return recordsService;
}

/**
 * Returns the configured IFamilyService singleton.
 */
export function getFamilyService(): IFamilyService {
  if (familyService) return familyService;
  if (isRealApiEnabled()) {
    familyService = new ApiFamilyService(getPatientId());
  } else {
    familyService = new MockFamilyService();
  }
  return familyService;
}

/**
 * Clears cached service instances — useful when the user logs out/in
 * and the patient ID changes.
 */
export function resetServices(): void {
  appointmentService = null;
  recordsService = null;
  familyService = null;
}
