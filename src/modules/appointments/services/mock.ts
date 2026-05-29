import type { Appointment, Provider, TimeSlot } from '../types';
import type { IAppointmentService, BookAppointmentData } from './types';

// ─── Mock Providers ───────────────────────────────────
const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'dr-sharma',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiology',
    qualification: 'MD, DM Cardiology',
    experience: 14,
    rating: 4.8,
    reviewCount: 126,
    availableToday: true,
    nextAvailable: 'Today, 2:30 PM',
    languages: ['English', 'Hindi'],
    gender: 'female',
    consultationFee: 800,
    telemedicineAvailable: true,
  },
  {
    id: 'dr-patel',
    name: 'Dr. Amit Patel',
    specialty: 'General Medicine',
    qualification: 'MBBS, MD',
    experience: 22,
    rating: 4.9,
    reviewCount: 342,
    availableToday: false,
    nextAvailable: 'Tomorrow, 9:00 AM',
    languages: ['English', 'Hindi', 'Gujarati'],
    gender: 'male',
    consultationFee: 500,
    telemedicineAvailable: true,
  },
  {
    id: 'dr-verma',
    name: 'Dr. Sneha Verma',
    specialty: 'Dermatology',
    qualification: 'MD, DVDL',
    experience: 8,
    rating: 4.6,
    reviewCount: 89,
    availableToday: true,
    nextAvailable: 'Today, 4:00 PM',
    languages: ['English', 'Hindi'],
    gender: 'female',
    consultationFee: 1000,
    telemedicineAvailable: true,
  },
  {
    id: 'dr-khan',
    name: 'Dr. Imran Khan',
    specialty: 'Orthopedics',
    qualification: 'MS, MCh Ortho',
    experience: 18,
    rating: 4.7,
    reviewCount: 215,
    availableToday: false,
    nextAvailable: 'Wed, 10:30 AM',
    languages: ['English', 'Hindi', 'Urdu'],
    gender: 'male',
    consultationFee: 900,
    telemedicineAvailable: false,
  },
  {
    id: 'dr-desai',
    name: 'Dr. Meera Desai',
    specialty: 'Pediatrics',
    qualification: 'MBBS, MD Pediatrics',
    experience: 12,
    rating: 4.9,
    reviewCount: 198,
    availableToday: true,
    nextAvailable: 'Today, 3:00 PM',
    languages: ['English', 'Hindi', 'Marathi'],
    gender: 'female',
    consultationFee: 700,
    telemedicineAvailable: true,
  },
  {
    id: 'dr-gupta',
    name: 'Dr. Vikram Gupta',
    specialty: 'Neurology',
    qualification: 'MD, DM Neurology',
    experience: 16,
    rating: 4.5,
    reviewCount: 73,
    availableToday: false,
    nextAvailable: 'Thu, 11:00 AM',
    languages: ['English', 'Hindi'],
    gender: 'male',
    consultationFee: 1200,
    telemedicineAvailable: false,
  },
];

// ─── Mock Appointments ───────────────────────────────
const NOW = new Date();
function addDays(d: Date, n: number): string {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r.toISOString();
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    patientId: 'patient-1',
    patientName: 'You',
    providerId: 'dr-patel',
    providerName: 'Dr. Amit Patel',
    specialty: 'General Medicine',
    type: 'in_person',
    status: 'confirmed',
    priority: 'routine',
    startAt: addDays(NOW, 1),
    endAt: addDays(NOW, 1),
    location: { name: 'Adrine Wellness Clinic', address: 'Bandra West, Mumbai' },
    preparation: ['Bring previous test reports', 'Fast for 8 hours (blood work)'],
    createdAt: addDays(NOW, -3),
    updatedAt: addDays(NOW, -1),
  },
  {
    id: 'apt-002',
    patientId: 'patient-1',
    patientName: 'You',
    providerId: 'dr-sharma',
    providerName: 'Dr. Priya Sharma',
    specialty: 'Cardiology',
    type: 'telemedicine',
    status: 'scheduled',
    priority: 'routine',
    startAt: addDays(NOW, 3),
    endAt: addDays(NOW, 3),
    notes: 'Follow-up on BP medication',
    preparation: ['Check BP before the call', 'Have recent ECG report handy'],
    createdAt: addDays(NOW, -7),
    updatedAt: addDays(NOW, -2),
  },
  {
    id: 'apt-005',
    patientId: 'patient-father',
    patientName: 'Rajesh Sharma',
    providerId: 'dr-patel',
    providerName: 'Dr. Amit Patel',
    specialty: 'General Medicine',
    type: 'in_person',
    status: 'confirmed',
    priority: 'routine',
    startAt: addDays(NOW, 1),
    endAt: addDays(NOW, 1),
    location: { name: 'Adrine Wellness Clinic', address: 'Bandra West, Mumbai' },
    notes: 'Father — Routine checkup & diabetes follow-up',
    createdAt: addDays(NOW, -2),
    updatedAt: addDays(NOW, -1),
  },
  {
    id: 'apt-003',
    patientId: 'patient-1',
    patientName: 'You',
    providerId: 'dr-verma',
    providerName: 'Dr. Sneha Verma',
    specialty: 'Dermatology',
    type: 'in_person',
    status: 'completed',
    priority: 'routine',
    startAt: addDays(NOW, -5),
    endAt: addDays(NOW, -5),
    location: { name: 'Adrine Skin Centre', address: 'Andheri East, Mumbai' },
    notes: 'Skin allergy consultation. Prescribed antihistamines.',
    createdAt: addDays(NOW, -14),
    updatedAt: addDays(NOW, -5),
  },
  {
    id: 'apt-006',
    patientId: 'patient-son',
    patientName: 'Arjun',
    providerId: 'dr-desai',
    providerName: 'Dr. Meera Desai',
    specialty: 'Pediatrics',
    type: 'in_person',
    status: 'scheduled',
    priority: 'routine',
    startAt: addDays(NOW, 5),
    endAt: addDays(NOW, 5),
    location: { name: "Adrine Children's Hospital", address: 'Lower Parel, Mumbai' },
    notes: 'Arjun — Routine vaccination & growth check',
    createdAt: addDays(NOW, -7),
    updatedAt: addDays(NOW, -3),
  },
  {
    id: 'apt-004',
    patientId: 'patient-1',
    patientName: 'You',
    providerId: 'dr-desai',
    providerName: 'Dr. Meera Desai',
    specialty: 'Pediatrics',
    type: 'in_person',
    status: 'cancelled',
    priority: 'urgent',
    startAt: addDays(NOW, -2),
    endAt: addDays(NOW, -2),
    location: { name: "Adrine Children's Hospital", address: 'Lower Parel, Mumbai' },
    createdAt: addDays(NOW, -10),
    updatedAt: addDays(NOW, -3),
  },
];

// ─── Mock Time Slots ─────────────────────────────────
function generateMockSlots(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 17;
  for (let h = startHour; h < endHour; h++) {
    slots.push({
      date: date.toISOString().split('T')[0],
      startTime: `${String(h).padStart(2, '0')}:00`,
      endTime: `${String(h + 1).padStart(2, '0')}:00`,
      available: Math.random() > 0.3,
    });
  }
  return slots;
}

// ─── Mock Service Implementation ────────────────────
export class MockAppointmentService implements IAppointmentService {
  async fetchProviders(): Promise<Provider[]> {
    await delay(400);
    return MOCK_PROVIDERS;
  }

  async fetchProvidersBySpecialty(specialty: string): Promise<Provider[]> {
    await delay(300);
    if (!specialty || specialty === 'all') return MOCK_PROVIDERS;
    return MOCK_PROVIDERS.filter((p) =>
      p.specialty.toLowerCase().includes(specialty.toLowerCase()),
    );
  }

  async fetchAppointmentById(id: string): Promise<Appointment | undefined> {
    await delay(200);
    return MOCK_APPOINTMENTS.find((a) => a.id === id);
  }

  async fetchAppointments(): Promise<Appointment[]> {
    await delay(300);
    return MOCK_APPOINTMENTS;
  }

  async fetchAvailableSlots(providerId: string, date: string): Promise<TimeSlot[]> {
    await delay(300);
    const d = date ? new Date(date) : new Date();
    return generateMockSlots(d);
  }

  async bookAppointment(data: BookAppointmentData): Promise<Appointment> {
    await delay(600);
    const provider = MOCK_PROVIDERS.find((p) => p.id === data.providerId);
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: data.patientId,
      patientName: data.patientName ?? 'You',
      providerId: data.providerId,
      providerName: provider?.name ?? 'Unknown',
      specialty: provider?.specialty ?? 'General',
      type: data.type as Appointment['type'],
      status: 'scheduled',
      priority: 'routine',
      startAt: new Date(`${data.date}T${data.time}`).toISOString(),
      endAt: new Date(`${data.date}T${data.time}`).toISOString(),
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_APPOINTMENTS.unshift(newAppointment);
    return newAppointment;
  }

  async cancelAppointment(id: string): Promise<void> {
    await delay(400);
    const apt = MOCK_APPOINTMENTS.find((a) => a.id === id);
    if (apt) apt.status = 'cancelled';
  }

  async rescheduleAppointment(
    id: string,
    date: string,
    time: string,
  ): Promise<Appointment | undefined> {
    await delay(400);
    const apt = MOCK_APPOINTMENTS.find((a) => a.id === id);
    if (apt) {
      apt.startAt = new Date(`${date}T${time}`).toISOString();
      apt.endAt = new Date(`${date}T${time}`).toISOString();
      apt.status = 'scheduled';
      apt.updatedAt = new Date().toISOString();
    }
    return apt;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
