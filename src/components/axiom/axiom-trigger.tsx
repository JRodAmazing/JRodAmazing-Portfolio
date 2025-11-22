'use client';

import { useState } from 'react';
import { ChatPanel } from './chat-panel';

export function AxiomTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button with pulse animation */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-plasma to-nebula shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Open AXIOM chat"
        style={{
          boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)',
        }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-plasma/30" style={{ animationDuration: '2s' }} />

        {/* Icon */}
        <span className="relative font-mono text-sm font-bold text-white">AX</span>
      </button>

      {/* Chat panel */}
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
