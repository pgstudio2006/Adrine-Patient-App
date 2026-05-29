import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { FamilyMember } from '../modules/family/types';

interface FamilyContextType {
  activeMember: FamilyMember | null;
  switchToMember: (member: FamilyMember | null) => void;
  clearContext: () => void;
  isManagingOther: boolean;
  contextLabel: string;
}

const FamilyContext = createContext<FamilyContextType | null>(null);

export function FamilyProvider({ children }: { children: React.ReactNode }) {
  const [activeMember, setActiveMember] = useState<FamilyMember | null>(null);

  const switchToMember = useCallback((member: FamilyMember | null) => {
    setActiveMember(member);
  }, []);

  const clearContext = useCallback(() => {
    setActiveMember(null);
  }, []);

  const isManagingOther = activeMember !== null && activeMember.relationship !== 'self';
  const contextLabel = activeMember && activeMember.relationship !== 'self'
    ? `Managing: ${activeMember.name.split('(')[0].trim()}`
    : '';

  const value = useMemo(
    () => ({ activeMember, switchToMember, clearContext, isManagingOther, contextLabel }),
    [activeMember, switchToMember, clearContext, isManagingOther, contextLabel],
  );

  return <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>;
}

export function useFamilyContext() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error('useFamilyContext must be used within FamilyProvider');
  return ctx;
}
