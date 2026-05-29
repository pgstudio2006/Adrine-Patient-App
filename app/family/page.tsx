'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Plus,
  ArrowRight,
  UserPlus,
  CaretRight,
  CalendarCheck,
  Pill,
  Flask,
  SealWarning,
  CheckCircle,
  Hourglass,
  XCircle,
  Sparkle,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, CardContent, Avatar, Badge, StatusBadge, Button, EmptyState } from '../../src/design-system';
import { useFamilyMembers, useHealthSummary } from '../../src/modules/family/hooks';
import { useFamilyContext } from '../../src/contexts/FamilyContext';
import type { FamilyMember } from '../../src/modules/family/types';

function getRelationshipLabel(rel: string): string {
  const map: Record<string, string> = {
    self: 'You',
    spouse: 'Spouse',
    parent: 'Parent',
    child: 'Child',
    sibling: 'Sibling',
    grandparent: 'Grandparent',
    grandchild: 'Grandchild',
    in_law: 'In-Law',
    professional_caregiver: 'Caregiver',
    other: 'Other',
  };
  return map[rel] ?? rel;
}

function getConsentLabel(type: string): string {
  const map: Record<string, string> = {
    explicit: 'Consented',
    legal_guardian: 'Legal Guardian',
    emergency: 'Emergency Contact',
    professional: 'Professional',
  };
  return map[type] ?? type;
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function MemberStatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return <Badge variant="success">Active</Badge>;
    case 'pending':
      return <Badge variant="warning">Pending</Badge>;
    case 'revoked':
      return <Badge variant="danger">Revoked</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
}

function MemberHealthSummary({ memberId }: { memberId: string }) {
  const { data: summary, isLoading } = useHealthSummary(memberId);

  if (isLoading || !summary) return null;

  return (
    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100">
      <div className="flex items-center gap-1.5">
        <CalendarCheck size={12} className="text-primary-500" />
        <span className="text-[10px] text-gray-600">{summary.upcomingAppointments} appt.</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Pill size={12} className="text-purple-500" />
        <span className="text-[10px] text-gray-600">{summary.activeMedications} meds</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Flask size={12} className="text-blue-500" />
        <span className="text-[10px] text-gray-600">{summary.pendingReports} reports</span>
      </div>
      {summary.healthScore && (
        <div className="flex items-center gap-1.5 ml-auto">
          <span className={`text-[10px] font-semibold ${
            summary.healthScore >= 80 ? 'text-green-600' :
            summary.healthScore >= 60 ? 'text-amber-600' :
            'text-red-600'
          }`}>
            {summary.healthScore}
          </span>
          <Sparkle size={10} className="text-primary-500" weight="fill" />
        </div>
      )}
    </div>
  );
}

function MemberCard({ member }: { member: FamilyMember }) {
  const { activeMember, switchToMember } = useFamilyContext();
  const isCurrentlyManaging = activeMember?.id === member.id && member.relationship !== 'self';
  const isSelf = member.relationship === 'self';

  return (
    <Link href={`/family/${member.id}`}>
      <Card variant="hover" padding="md">
        <div className="flex items-start gap-3">
          <div className={`relative shrink-0 ${
            member.relationship === 'self'
              ? 'w-12 h-12 rounded-full ring-2 ring-primary-300 ring-offset-1'
              : 'w-12 h-12'
          }`}>
            <Avatar name={member.name} size="md" />
            {member.relationship === 'self' && (
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle size={8} weight="fill" className="text-white" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`text-sm font-semibold truncate ${
                isCurrentlyManaging ? 'text-primary-700' : 'text-gray-900'
              }`}>
                {member.name}
              </h3>
              <MemberStatusBadge status={member.status} />
              {isCurrentlyManaging && (
                <Badge variant="primary">Managing</Badge>
              )}
            </div>
            <p className="text-xs text-muted mt-0.5">
              {getRelationshipLabel(member.relationship)}
              {member.age ? ` · ${member.age} yrs` : ''}
              {member.bloodGroup ? ` · ${member.bloodGroup}` : ''}
            </p>
            <p className="text-[10px] text-muted mt-0.5">
              {getConsentLabel(member.consentType)}
              {member.lastActive && ` · Last active ${new Date(member.lastActive).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
            </p>

            <MemberHealthSummary memberId={member.id} />

            {/* Quick context switch button */}
            {!isSelf && member.status === 'active' && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    switchToMember(isCurrentlyManaging ? null : member);
                  }}
                  className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isCurrentlyManaging
                      ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isCurrentlyManaging ? (
                    <>Switch back to self</>
                  ) : (
                    <>
                      <CaretRight size={12} weight="bold" />
                      Manage health for {member.name.split(' ')[0]}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <ArrowRight size={16} className="text-muted shrink-0 mt-1" />
        </div>
      </Card>
    </Link>
  );
}

export default function FamilyPage() {
  const { activeMember, isManagingOther, contextLabel } = useFamilyContext();
  const { data: members, isLoading, error } = useFamilyMembers();
  const [showInviteForm, setShowInviteForm] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Family</h1>
          <p className="text-sm text-muted mt-0.5">Manage health for your loved ones</p>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md">
              <div className="flex items-center gap-3 animate-pulse">
                <div className="w-12 h-12 rounded-full skeleton" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 skeleton" />
                  <div className="h-3 w-24 skeleton" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Family</h1>
          <p className="text-sm text-muted mt-0.5">Manage health for your loved ones</p>
        </div>
        <Card padding="lg">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3">
              <SealWarning size={24} weight="fill" />
            </div>
            <p className="text-sm font-medium text-gray-900">Failed to load family members</p>
            <Button variant="secondary" size="sm" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const activeMembers = members?.filter((m) => m.status === 'active') ?? [];
  const pendingMembers = members?.filter((m) => m.status === 'pending') ?? [];
  const selfMember = activeMembers.find((m) => m.relationship === 'self');
  const otherMembers = activeMembers.filter((m) => m.relationship !== 'self');

  return (
    <div className="space-y-5">
      {/* Context switch banner */}
      {isManagingOther && (
        <Card padding="sm" variant="flat">
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex-1 flex items-center gap-2">
              <Sparkle size={14} className="text-primary-600" weight="fill" />
              <span className="text-xs font-medium text-primary-700">{contextLabel}</span>
            </div>
            <span className="text-[10px] text-muted bg-primary-50 px-2 py-0.5 rounded-full">Viewing as them</span>
          </div>
        </Card>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Family</h1>
          <p className="text-sm text-muted mt-0.5">Manage health for your loved ones</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<UserPlus size={16} weight="bold" />}
          onClick={() => setShowInviteForm(true)}
        >
          Invite
        </Button>
      </div>

      {/* Active members */}
      {activeMembers.length > 0 ? (
        <div className="space-y-3">
          {/* Self card first */}
          {selfMember && (
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">You</h2>
              <MemberCard member={selfMember} />
            </div>
          )}

          {/* Other members */}
          {otherMembers.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Family Members ({otherMembers.length})
              </h2>
              <div className="space-y-2">
                {otherMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card padding="lg">
          <EmptyState
            icon={<Users size={40} className="text-muted" />}
            title="No family members yet"
            description="Invite family members to manage their health records, appointments, and medications."
            action={
              <Button
                variant="primary"
                size="sm"
                icon={<Plus size={16} weight="bold" />}
                onClick={() => setShowInviteForm(true)}
              >
                Add Family Member
              </Button>
            }
          />
        </Card>
      )}

      {/* Pending invites */}
      {pendingMembers.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Pending Invites ({pendingMembers.length})
          </h2>
          <div className="space-y-2">
            {pendingMembers.map((member) => (
              <Card key={member.id} padding="md" variant="flat">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold shrink-0">
                    <Hourglass size={20} weight="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-xs text-muted">
                      {getRelationshipLabel(member.relationship)} · Invited {new Date(member.addedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Invite form */}
      {showInviteForm && (
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Invite a Family Member</h3>
            <button
              type="button"
              onClick={() => setShowInviteForm(false)}
              className="btn-ghost btn-icon rounded-full"
            >
              <XCircle size={18} />
            </button>
          </div>
          <div className="space-y-3">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input type="text" className="input" placeholder="e.g. Meera Sharma" />
            </div>
            <div className="input-group">
              <label className="input-label">Relationship</label>
              <select className="input">
                <option value="">Select relationship...</option>
                <option value="spouse">Spouse</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="sibling">Sibling</option>
                <option value="grandparent">Grandparent</option>
                <option value="professional_caregiver">Caregiver</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Button variant="primary" className="w-full justify-center" icon={<UserPlus size={16} weight="bold" />}>
              Send Invite
            </Button>
          </div>
        </Card>
      )}

      {/* Info section */}
      <div className="text-center">
        <p className="text-[10px] text-muted">
          Family members can view and manage health data based on permissions you set.
        </p>
      </div>
    </div>
  );
}
