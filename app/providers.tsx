'use client';

import { AuthProvider } from '../src/contexts/AuthContext';
import { FamilyProvider } from '../src/contexts/FamilyContext';
import { QueryProvider } from '../src/providers/QueryProvider';
import { AppShell } from '../src/components/AppShell';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <FamilyProvider>
          <AppShell>{children}</AppShell>
        </FamilyProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
