import AsyncStorage from '@react-native-async-storage/async-storage';

export type PlatformSession = {
  accessToken: string;
  tenantId: string;
  branchId: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  patientId?: string;
};

const SESSION_KEY = 'adrine_platform_session';

export function isPlatformRuntimeEnabled(): boolean {
  return process.env.EXPO_PUBLIC_PLATFORM_RUNTIME === 'true';
}

export async function getPlatformSession(): Promise<PlatformSession | null> {
  try {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlatformSession;
  } catch {
    return null;
  }
}

export async function setPlatformSession(session: PlatformSession): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function clearPlatformSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function platformHeaders(): Promise<Record<string, string>> {
  const session = await getPlatformSession();
  const tenantId =
    session?.tenantId ?? process.env.EXPO_PUBLIC_DEV_TENANT_ID ?? 'tenant_dev';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-tenant-id': tenantId,
  };
  if (session?.branchId) headers['x-branch-id'] = session.branchId;
  if (session?.accessToken) headers.Authorization = `Bearer ${session.accessToken}`;
  if (session?.role) headers['x-actor-role'] = session.role;
  if (session?.userId) headers['x-actor-id'] = session.userId;
  return headers;
}
