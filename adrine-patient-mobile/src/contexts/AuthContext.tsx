import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  clearPlatformSession,
  getPlatformSession,
  isPlatformRuntimeEnabled,
  setPlatformSession,
  type PlatformSession,
} from '../runtime/platform-session';

type AuthContextType = {
  session: PlatformSession | null;
  patientId: string | null;
  platformConnected: boolean;
  loading: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<PlatformSession | null>(null);
  const [platformConnected, setPlatformConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getPlatformSession();
      if (stored) {
        setSession(stored);
        setPlatformConnected(isPlatformRuntimeEnabled());
      }
      setLoading(false);
    })();
  }, []);

  const login = useCallback(async (_email: string, _password: string) => {
    // Simplified login for mobile - create a local session
    const local: PlatformSession = {
      accessToken: 'local',
      tenantId: process.env.EXPO_PUBLIC_DEV_TENANT_ID ?? 'tenant_dev',
      branchId: 'branch_main',
      userId: Math.random().toString(36).slice(2),
      email: _email || 'patient@local.dev',
      name: _email ? _email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Patient',
      role: 'patient',
      patientId: process.env.EXPO_PUBLIC_DEV_PATIENT_ID || process.env.EXPO_PUBLIC_DEFAULT_PATIENT_ID || 'patient-default',
    };
    await setPlatformSession(local);
    setSession(local);
    setPlatformConnected(false);
  }, []);

  const logout = useCallback(() => {
    clearPlatformSession();
    setSession(null);
    setPlatformConnected(false);
  }, []);

  const value = useMemo(
    () => ({
      session,
      patientId: session?.patientId ?? null,
      platformConnected,
      loading,
      isLoading: loading,
      login,
      logout,
    }),
    [session, platformConnected, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
