'use client';

import { useState } from 'react';

const emergencyPhrases = [
  'I feel sick.',
  'I need to go to the nurse.',
  'I’m having trouble breathing.',
  'I feel dizzy.',
  'I’m having an anxiety attack.',
  'I need help right now.',
  'I feel unsafe.',
];

async function logMessage(message: string) {
  try {
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        source: 'emergency',
        context: 'classroom', // or you can pass context as a prop later
      }),
    });
  } catch (err) {
    console.error('Failed to log emergency:', err);
  }
}

export default function EmergencyPanel() {
  const [open, setOpen] = useState(false);

  const speak = async (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);

    await logMessage(text);
  };

  return (
    <div className="w-full mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition w-full"
      >
        ⚠️ Emergency
      </button>

      {open && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {emergencyPhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => speak(phrase)}
              className="w-full bg-red-100 hover:bg-red-200 text-red-900 font-medium px-3 py-2 rounded-lg text-left shadow"
            >
              {phrase}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
