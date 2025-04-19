'use client';

import { useState } from 'react';
import { expandIntent } from '@/lib/openai';

const gestureMap: { [key: string]: string } = {
  '✋': 'I have a question.',
  '👍': 'I understand.',
  '🤔': 'I need help.',
  '🙋‍♂️': 'I want to answer.',
};

export default function GestureInput() {
  const [output, setOutput] = useState('');

  const handleClick = async (gesture: string) => {
    const baseIntent = gestureMap[gesture];
    const polite = await expandIntent(baseIntent);
    setOutput(polite);
    speak(polite);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-2xl shadow-lg max-w-md w-full">
      <h2 className="text-xl font-semibold text-gray-700">Tap a Gesture to Speak 👇</h2>

      <div className="flex gap-4 text-4xl">
        {Object.keys(gestureMap).map((gesture) => (
          <button
            key={gesture}
            onClick={() => handleClick(gesture)}
            className="hover:scale-110 transition transform active:scale-95"
          >
            {gesture}
          </button>
        ))}
      </div>

      {output && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg w-full text-center">
          <p className="text-xs text-gray-500">AI Response:</p>
          <p className="text-lg font-medium text-blue-800">{output}</p>
        </div>
      )}
    </div>
  );
}
