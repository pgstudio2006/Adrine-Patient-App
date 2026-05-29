'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  VideoCamera,
  Microphone,
  MicrophoneSlash,
  VideoCameraSlash,
  PhoneDisconnect,
  ChatCircleDots,
  Desktop,
  Clock,
  ShieldCheck,
  CheckCircle,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, Badge, Button } from '../../../src/design-system';
import { useAppointment } from '../../../src/modules/appointments/hooks';

type SessionPhase = 'pre' | 'in-session' | 'post';

export default function TelemedicineRoomPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: appointment, isLoading } = useAppointment(params.id);
  const [phase, setPhase] = useState<SessionPhase>('pre');
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [micChecked, setMicChecked] = useState(false);
  const [camChecked, setCamChecked] = useState(false);
  const [internetChecked, setInternetChecked] = useState(false);
  const allDevicesChecked = micChecked && camChecked && internetChecked;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          <p className="text-sm text-white/60">Loading session…</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
        <Card padding="lg" className="text-center max-w-sm">
          <h2 className="text-lg font-semibold text-gray-900">Session not found</h2>
          <p className="text-sm text-muted mt-1">This telemedicine session doesn&apos;t exist.</p>
          <Link href="/appointments" className="btn-primary mt-4 inline-flex">Back to Appointments</Link>
        </Card>
      </div>
    );
  }

  // ─── Pre-session (Waiting Room) ───────────────────
  if (phase === 'pre') {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
          <button onClick={() => router.back()} className="text-white/70 hover:text-white transition-colors p-2" aria-label="Leave session">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Badge variant="warning" dot>Waiting Room</Badge>
          </div>
          <div className="w-10" />
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-sm w-full text-center">
            {/* Doctor info */}
            <div className="w-24 h-24 rounded-full bg-primary-600/20 flex items-center justify-center mx-auto mb-4 ring-2 ring-primary-500/30">
              <span className="text-white text-3xl font-bold">
                {appointment.providerName.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white">{appointment.providerName}</h1>
            <p className="text-sm text-white/60">{appointment.specialty}</p>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
              <Clock size={14} />
              <span>Your provider will join shortly</span>
            </div>

            {/* Device check */}
            <Card padding="md" className="mt-6 text-left bg-white/5 border-white/10">
              <CardTitle className="text-white text-sm mb-3">Pre-Call Checklist</CardTitle>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-sm text-white/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={micChecked}
                    onChange={(e) => setMicChecked(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30 bg-white/10 accent-primary-500"
                  />
                  <Microphone size={14} />
                  Microphone is working
                </label>
                <label className="flex items-center gap-2.5 text-sm text-white/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={camChecked}
                    onChange={(e) => setCamChecked(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30 bg-white/10 accent-primary-500"
                  />
                  <VideoCamera size={14} />
                  Camera is working
                </label>
                <label className="flex items-center gap-2.5 text-sm text-white/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={internetChecked}
                    onChange={(e) => setInternetChecked(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30 bg-white/10 accent-primary-500"
                  />
                  <Desktop size={14} />
                  Stable internet connection
                </label>
              </div>
            </Card>

            {/* Join button */}
            <Button
              className="w-full justify-center mt-6"
              size="lg"
              icon={<VideoCamera size={20} weight="fill" />}
              onClick={() => setPhase('in-session')}
              disabled={!allDevicesChecked}
            >
              Join Session
            </Button>

            <p className="text-xs text-white/40 mt-3 flex items-center justify-center gap-1">
              <ShieldCheck size={12} />
              End-to-end encrypted
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── In-Session ───────────────────────────────────
  if (phase === 'in-session') {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Video area (mock) */}
        <div className="flex-1 relative bg-gray-800 flex items-center justify-center">
          {/* Mock remote video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary-600/30 flex items-center justify-center mx-auto mb-3">
                <VideoCamera size={32} className="text-white/30" />
              </div>
              <p className="text-white/40 text-sm">Provider video feed will appear here</p>
            </div>
          </div>

          {/* Mock local video (PiP) */}
          <div className="absolute top-4 right-4 w-28 h-40 rounded-xl bg-gray-700 border-2 border-white/20 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary-500/40 flex items-center justify-center">
                <span className="text-white text-xs">You</span>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 border-t border-white/10 px-6 py-4">
          <div className="flex items-center justify-center gap-4 max-w-sm mx-auto">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-3.5 rounded-full transition-all ${micOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-600 text-white'}`}
              aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
            >
              {micOn ? <Microphone size={20} weight="fill" /> : <MicrophoneSlash size={20} weight="fill" />}
            </button>
            <button
              onClick={() => setCamOn(!camOn)}
              className={`p-3.5 rounded-full transition-all ${camOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-600 text-white'}`}
              aria-label={camOn ? 'Turn off camera' : 'Turn on camera'}
            >
              {camOn ? <VideoCamera size={20} weight="fill" /> : <VideoCameraSlash size={20} weight="fill" />}
            </button>
            <button className="p-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all" aria-label="Chat">
              <ChatCircleDots size={20} weight="fill" />
            </button>
            <button
              onClick={() => setPhase('post')}
              className="p-3.5 rounded-full bg-red-600 text-white hover:bg-red-500 transition-all"
              aria-label="End call"
            >
              <PhoneDisconnect size={20} weight="fill" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Post-Session ─────────────────────────────────
  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col p-4">
      <div className="max-w-sm mx-auto w-full space-y-4 pt-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
            <PhoneDisconnect size={28} className="text-green-600" weight="fill" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Session Ended</h1>
          <p className="text-sm text-muted mt-1">Your consultation with {appointment.providerName} has ended</p>
        </div>

        {/* Post-session actions */}
        <Card padding="lg" className="space-y-3 mt-6">
          <h2 className="text-sm font-semibold text-gray-900">Post-Visit Actions</h2>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <span className="flex-1 text-sm font-medium text-gray-900">View Visit Summary</span>
              <span className="text-xs text-muted bg-gray-100 px-2 py-0.5 rounded-full">Coming soon</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <span className="flex-1 text-sm font-medium text-gray-900">View Prescription</span>
              <span className="text-xs text-muted bg-gray-100 px-2 py-0.5 rounded-full">Coming soon</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="flex-1 text-sm font-medium text-gray-900">Schedule Follow-up</span>
              <span className="text-xs text-muted bg-gray-100 px-2 py-0.5 rounded-full">Coming soon</span>
            </button>
          </div>
        </Card>

        <Link href="/dashboard" className="btn-secondary w-full justify-center">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
