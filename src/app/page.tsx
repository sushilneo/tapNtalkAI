import GestureInput from '@/components/GestureInput';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-white px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">🗣️ TapNTalk AI</h1>
        <p className="text-gray-600 mt-2 text-base">Speak smarter — built for students with speech impairments</p>
      </header>

      <GestureInput />

      <footer className="mt-12 text-xs text-gray-400 text-center">
        Powered by OpenRouter AI · Built at FutureHacks VII 🚀
      </footer>
    </main>
  );
}