import type { Appointment, Provider, TimeSlot } from './types';

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
function addHours(d: Date, h: number): string {
  const r = new Date(d);
  r.setHours(r.getHours() + h);
  return r.toISOString();
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    patientId: 'patient-1',
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
    id: 'apt-003',
    patientId: 'patient-1',
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
    id: 'apt-004',
    patientId: 'patient-1',
    providerId: 'dr-desai',
    providerName: 'Dr. Meera Desai',
    specialty: 'Pediatrics',
    type: 'in_person',
    status: 'cancelled',
    priority: 'urgent',
    startAt: addDays(NOW, -2),
    endAt: addDays(NOW, -2),
    location: { name: 'Adrine Children\'s Hospital', address: 'Lower Parel, Mumbai' },
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

// ─── Service Functions ──────────────────────────────
export function fetchProviders(): Promise<Provider[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PROVIDERS), 400);
  });
}

export function fetchProvidersBySpecialty(specialty: string): Promise<Provider[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!specialty || specialty === 'all') resolve(MOCK_PROVIDERS);
      else resolve(MOCK_PROVIDERS.filter((p) => p.specialty.toLowerCase().includes(specialty.toLowerCase())));
    }, 300);
  });
}

export function fetchAppointmentById(id: string): Promise<Appointment | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_APPOINTMENTS.find((a) => a.id === id)), 200);
  });
}

export function fetchAppointments(): Promise<Appointment[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_APPOINTMENTS), 300);
  });
}

export function fetchAvailableSlots(providerId: string, date: string): Promise<TimeSlot[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const d = date ? new Date(date) : new Date();
      resolve(generateMockSlots(d));
    }, 300);
  });
}

export function bookAppointment(data: {
  providerId: string;
  patientId: string;
  type: string;
  date: string;
  time: string;
  notes?: string;
}): Promise<Appointment> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const provider = MOCK_PROVIDERS.find((p) => p.id === data.providerId);
      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        patientId: data.patientId,
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
      resolve(newAppointment);
    }, 600);
  });
}

export function cancelAppointment(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const apt = MOCK_APPOINTMENTS.find((a) => a.id === id);
      if (apt) apt.status = 'cancelled';
      resolve();
    }, 400);
  });
}

export function rescheduleAppointment(id: string, date: string, time: string): Promise<Appointment | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const apt = MOCK_APPOINTMENTS.find((a) => a.id === id);
      if (apt) {
        apt.startAt = new Date(`${date}T${time}`).toISOString();
        apt.endAt = new Date(`${date}T${time}`).toISOString();
        apt.status = 'scheduled';
        apt.updatedAt = new Date().toISOString();
      }
      resolve(apt);
    }, 400);
  });
}
