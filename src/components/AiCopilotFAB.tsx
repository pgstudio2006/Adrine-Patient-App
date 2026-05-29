'use client';

import { useState } from 'react';
import { Sparkle, X, ChatCircleDots, Microphone, Camera } from '@phosphor-icons/react';

const QUICK_ACTIONS = [
  { icon: ChatCircleDots, label: 'Ask AI', color: 'bg-primary-500' },
  { icon: Microphone, label: 'Voice', color: 'bg-blue-500' },
  { icon: Camera, label: 'Scan', color: 'bg-purple-500' },
];

export function AiCopilotFAB() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-5 bottom-20 z-50 flex flex-col items-end gap-3">
      {/* Quick action buttons */}
      {open && (
        <div className="flex flex-col items-end gap-3 animate-fade-in" role="menu">
          {QUICK_ACTIONS.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className={`${color} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95`}
              aria-label={label}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                // TODO: Open appropriate AI Copilot mode
              }}
            >
              <Icon size={20} weight="fill" />
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          p-3.5 rounded-full shadow-lg transition-all duration-200 active:scale-95
          ${open
            ? 'bg-gray-800 text-white rotate-45 shadow-xl'
            : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5'
          }
        `}
        aria-label={open ? 'Close AI Copilot menu' : 'Open AI Copilot'}
        aria-expanded={open}
      >
        {open ? <X size={24} weight="bold" /> : <Sparkle size={24} weight="fill" />}
      </button>

      {/* Tooltip when closed */}
      {!open && (
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 pointer-events-none transition-opacity">
          AI Copilot
        </span>
      )}
    </div>
  );
}
