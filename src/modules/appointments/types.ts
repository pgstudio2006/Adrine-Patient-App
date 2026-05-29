export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'checked_in'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type AppointmentType = 'in_person' | 'telemedicine' | 'home_visit' | 'lab_visit';

export type AppointmentPriority = 'routine' | 'urgent' | 'emergency';

export interface Appointment {
  id: string;
  patientId: string;
  patientName?: string;
  providerId: string;
  providerName: string;
  specialty: string;
  type: AppointmentType;
  status: AppointmentStatus;
  priority: AppointmentPriority;
  startAt: string;
  endAt: string;
  location?: {
    name: string;
    address: string;
    landmark?: string;
  };
  notes?: string;
  preparation?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  rating: number;
  reviewCount: number;
  availableToday: boolean;
  nextAvailable: string;
  imageUrl?: string;
  languages: string[];
  gender: 'male' | 'female' | 'other';
  consultationFee: number;
  telemedicineAvailable: boolean;
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface BookingFormData {
  providerId: string;
  providerName: string;
  specialty: string;
  type: AppointmentType;
  date: string;
  time: string;
  notes?: string;
  forSelf: boolean;
  familyMemberId?: string;
}
