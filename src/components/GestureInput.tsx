'use client';

import { useState, useEffect } from 'react';
import { expandIntent } from '@/lib/openai';

const gestureMap: { [key: string]: string } = {
  '✋': 'I have a question.',
  '👍': 'I understand.',
  '🤔': 'I need help.',
  '🙋‍♂️': 'I want to answer.',
};

export default function GestureInput() {
  const [output, setOutput] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices.find((v) => v.lang === 'en-US') || null);
    };

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const handleClick = async (gesture: string) => {
    const baseIntent = gestureMap[gesture];
    const polite = await expandIntent(baseIntent);
    setOutput(polite);
    speak(polite);
  };

  const handleCustomSpeak = async () => {
    if (customInput.trim()) {
      setOutput(customInput.trim());
      speak(customInput.trim());
      setCustomInput('');
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
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

      <div className="w-full mt-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Or type your message:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type what you want to say..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-black"
          />
          <button
            onClick={handleCustomSpeak}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Speak
          </button>
        </div>
      </div>

      {voices.length > 0 && (
        <div className="w-full mt-4 text-sm">
          <label className="block text-gray-600 mb-1">Choose a Voice:</label>
          <select
            value={selectedVoice?.name}
            onChange={(e) => {
              const voice = voices.find((v) => v.name === e.target.value);
              setSelectedVoice(voice || null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-black"
          >
            {voices.map((voice, idx) => (
              <option key={idx} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      )}

      {output && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg w-full text-center">
          <p className="text-xs text-gray-500">Spoken Output:</p>
          <p className="text-lg font-medium text-blue-800">{output}</p>
        </div>
      )}
    </div>
  );
}
