'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CalendarCheck,
  Pill,
  Flask,
  Sparkle,
  Note,
  CaretRight,
  CheckCircle,
  SealWarning,
  WarningCircle,
  Info,
  Drop,
  ShieldCheck,
  TrashSimple,
  PencilSimple,
  DotsThreeVertical,
  Heart,
  ChatCircleDots,
} from '@phosphor-icons/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  Badge,
  StatusBadge,
  Button,
  SectionHeader,
} from '../../../src/design-system';
import { useFamilyMember, useHealthSummary, useCaregiverNotes, useAddCaregiverNote, useRemoveFamilyMember } from '../../../src/modules/family/hooks';
import { useFamilyContext } from '../../../src/contexts/FamilyContext';
import type { FamilyMember } from '../../../src/modules/family/types';

function getRelationshipLabel(rel: string): string {
  const map: Record<string, string> = {
    self: 'Self',
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
    explicit: 'Explicit Consent',
    legal_guardian: 'Legal Guardian',
    emergency: 'Emergency Contact',
    professional: 'Professional Caregiver',
  };
  return map[type] ?? type;
}

function getCategoryLabel(cat: string): string {
  const map: Record<string, string> = {
    medication: 'Medication',
    symptom: 'Symptom',
    appointment: 'Appointment',
    general: 'General',
    emergency: 'Emergency',
  };
  return map[cat] ?? cat;
}

function getCategoryColor(cat: string): string {
  const map: Record<string, string> = {
    medication: 'bg-purple-50 text-purple-600',
    symptom: 'bg-amber-50 text-amber-600',
    appointment: 'bg-blue-50 text-blue-600',
    general: 'bg-gray-50 text-gray-600',
    emergency: 'bg-red-50 text-red-600',
  };
  return map[cat] ?? 'bg-gray-50 text-gray-600';
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function FamilyMemberDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { activeMember, isManagingOther, switchToMember } = useFamilyContext();

  const { data: member, isLoading, error } = useFamilyMember(params.id);
  const { data: summary } = useHealthSummary(params.id);
  const { data: notes, isLoading: notesLoading } = useCaregiverNotes(params.id);
  const addNoteMutation = useAddCaregiverNote();
  const removeMemberMutation = useRemoveFamilyMember();

  const [newNote, setNewNote] = useState('');
  const [noteCategory, setNoteCategory] = useState('general');
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const isSelf = member?.relationship === 'self';
  const isCurrentlyManaging = activeMember?.id === member?.id && !isSelf;

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await addNoteMutation.mutateAsync({
        memberId: params.id,
        content: newNote.trim(),
        category: noteCategory,
      });
      setNewNote('');
      setNoteCategory('general');
    } catch {
      // handled by mutation state
    }
  };

  const handleRemoveMember = async () => {
    try {
      await removeMemberMutation.mutateAsync(params.id);
      if (isCurrentlyManaging) {
        switchToMember(null);
      }
      router.push('/family');
    } catch {
      // handled by mutation state
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <button onClick={() => router.back()} className="btn-ghost btn-icon rounded-full" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <Card padding="lg">
          <div className="space-y-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full skeleton" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-40 skeleton" />
                <div className="h-4 w-24 skeleton" />
              </div>
            </div>
            <div className="h-16 skeleton rounded-lg" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 skeleton rounded-lg" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="space-y-4">
        <button onClick={() => router.back()} className="btn-ghost btn-icon rounded-full" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <Card padding="lg">
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <SealWarning size={28} weight="fill" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Member not found</h2>
            <p className="text-sm text-muted mt-1">This family member may have been removed or doesn&apos;t exist.</p>
            <Link href="/family" className="btn-primary mt-6">Back to Family</Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Back button & actions */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="btn-ghost btn-icon rounded-full" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        {!isSelf && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowActions(!showActions)}
              className="btn-ghost btn-icon rounded-full"
            >
              <DotsThreeVertical size={20} />
            </button>
            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-20">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <PencilSimple size={16} />
                  Edit Details
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ShieldCheck size={16} />
                  Manage Permissions
                </button>
                <hr className="my-1 border-gray-100" />
                <button
                  type="button"
                  onClick={() => { setShowRemoveConfirm(true); setShowActions(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <TrashSimple size={16} />
                  Remove Member
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Profile header */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <Avatar name={member.name} size="lg" />
            {member.relationship === 'self' && (
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle size={8} weight="fill" className="text-white" />
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{member.name}</h1>
            <p className="text-sm text-muted">
              {getRelationshipLabel(member.relationship)}
              {member.age ? ` · ${member.age} years` : ''}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={member.status === 'active' ? 'success' : member.status === 'pending' ? 'warning' : 'danger'}>
                {member.status === 'active' ? 'Active' : member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </Badge>
              <span className="text-[10px] text-muted">{getConsentLabel(member.consentType)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Context switch banner */}
      {!isSelf && member.status === 'active' && (
        <Card padding="sm" variant="flat">
          <button
            type="button"
            onClick={() => switchToMember(isCurrentlyManaging ? null : member)}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-150 ${
              isCurrentlyManaging
                ? 'bg-primary-50 text-primary-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CaretRight size={14} weight="bold" />
            {isCurrentlyManaging
              ? 'Switch back to self'
              : `Manage health for ${member.name.split(' ')[0]}`
            }
          </button>
        </Card>
      )}

      {/* Health Score */}
      {summary && !isSelf && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-primary-600" weight="fill" />
              <CardTitle>Health Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-blue-50">
                <CalendarCheck size={20} className="text-blue-600 mx-auto mb-1" weight="fill" />
                <p className="text-lg font-bold text-gray-900">{summary.upcomingAppointments}</p>
                <p className="text-[10px] text-muted">Appointments</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-50">
                <Pill size={20} className="text-purple-600 mx-auto mb-1" weight="fill" />
                <p className="text-lg font-bold text-gray-900">{summary.activeMedications}</p>
                <p className="text-[10px] text-muted">Medications</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-amber-50">
                <Flask size={20} className="text-amber-600 mx-auto mb-1" weight="fill" />
                <p className="text-lg font-bold text-gray-900">{summary.pendingReports}</p>
                <p className="text-[10px] text-muted">Pending Reports</p>
              </div>
            </div>

            {summary.healthScore && (
              <div className="mt-3 p-3 rounded-lg bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkle size={16} className="text-primary-600" weight="fill" />
                  <span className="text-sm text-gray-700">Health Score</span>
                </div>
                <span className={`text-lg font-bold ${
                  summary.healthScore >= 80 ? 'text-green-600' :
                  summary.healthScore >= 60 ? 'text-amber-600' :
                  'text-red-600'
                }`}>
                  {summary.healthScore}/100
                </span>
              </div>
            )}

            {summary.alerts > 0 && (
              <div className="mt-2 p-2 rounded-lg bg-red-50 flex items-center gap-2">
                <SealWarning size={14} className="text-red-600 shrink-0" weight="fill" />
                <span className="text-xs text-red-700">{summary.alerts} health alert{summary.alerts > 1 ? 's' : ''} detected</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick actions */}
      {!isSelf && (
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/appointments/book"
            className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700"
          >
            <CalendarCheck size={18} className="text-primary-600" />
            Book Appointment
          </Link>
          <button
            type="button"
            className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700"
          >
            <ChatCircleDots size={18} className="text-blue-600" />
            Ask AI
          </button>
        </div>
      )}

      {/* Medical info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info size={18} className="text-muted" />
            <CardTitle>Medical Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {member.bloodGroup && (
              <div className="flex items-center gap-3">
                <Drop size={18} className="text-red-500" weight="fill" />
                <div>
                  <p className="text-xs text-muted">Blood Group</p>
                  <p className="text-sm font-medium text-gray-900">{member.bloodGroup}</p>
                </div>
              </div>
            )}
            {member.allergies && member.allergies.length > 0 && (
              <div className="flex items-start gap-3">
                <SealWarning size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted">Allergies</p>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {member.allergies.map((a, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {member.chronicConditions && member.chronicConditions.length > 0 && (
              <div className="flex items-start gap-3">
                <WarningCircle size={18} className="text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted">Chronic Conditions</p>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {member.chronicConditions.map((c, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-50 text-purple-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {!member.bloodGroup && (!member.allergies || member.allergies.length === 0) && (!member.chronicConditions || member.chronicConditions.length === 0) && (
              <p className="text-sm text-muted text-center py-4">No medical information recorded yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Caregiver Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Note size={18} className="text-primary-600" />
            <CardTitle>Care Notes ({notes?.length ?? 0})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add note form */}
          <div className="space-y-2 mb-4">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a care note..."
              className="input min-h-[80px] resize-none"
              rows={3}
            />
            <div className="flex items-center gap-2">
              <select
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value)}
                className="input text-xs py-1.5 w-auto"
              >
                <option value="general">General</option>
                <option value="medication">Medication</option>
                <option value="symptom">Symptom</option>
                <option value="appointment">Appointment</option>
                <option value="emergency">Emergency</option>
              </select>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddNote}
                disabled={!newNote.trim() || addNoteMutation.isPending}
              >
                {addNoteMutation.isPending ? 'Adding...' : 'Add Note'}
              </Button>
            </div>
          </div>

          {/* Notes list */}
          {notesLoading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 skeleton rounded-lg" />
              ))}
            </div>
          ) : notes && notes.length > 0 ? (
            <div className="space-y-2 -mx-4 -mb-4">
              {notes.map((note) => (
                <div key={note.id} className="px-4 py-3 border-t border-gray-100">
                  <div className="flex items-start gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${getCategoryColor(note.category)}`}>
                      <Note size={12} weight="fill" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-medium text-gray-700">{note.authorName}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            note.category === 'emergency' ? 'bg-red-50 text-red-600' :
                            note.category === 'medication' ? 'bg-purple-50 text-purple-600' :
                            note.category === 'symptom' ? 'bg-amber-50 text-amber-600' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {getCategoryLabel(note.category)}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted whitespace-nowrap">{formatDateTime(note.createdAt)}</span>
                      </div>
                      <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">{note.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted text-center py-4">No care notes yet. Add your first note above.</p>
          )}
        </CardContent>
      </Card>

      {/* Permissions info */}
      {member.permissions && member.permissions.length > 0 && (
        <Card padding="md" variant="flat">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={16} className="text-primary-600" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Permissions</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {member.permissions.map((perm) => (
              <span key={perm} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700">
                {perm.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Remove member confirmation */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <Card padding="lg" className="w-full max-w-sm">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                <TrashSimple size={28} weight="fill" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Remove {member.name.split(' ')[0]}?</h3>
              <p className="text-sm text-muted mt-2">
                This will revoke all access permissions and remove them from your family network. This action cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="secondary"
                  className="flex-1 justify-center"
                  onClick={() => setShowRemoveConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  className="flex-1 justify-center"
                  onClick={handleRemoveMember}
                  disabled={removeMemberMutation.isPending}
                >
                  {removeMemberMutation.isPending ? 'Removing...' : 'Remove'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
