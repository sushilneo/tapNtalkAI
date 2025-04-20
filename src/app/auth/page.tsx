// File: src/app/auth/page.tsx
'use client';

import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase';

const auth = getAuth(app);

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser(result.user);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setUser(result.user);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold">Welcome, {user.email} 👋</h2>
        <p className="mt-4 text-gray-500">You're now logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md text-black"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md text-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <p className="mt-4 text-sm text-center">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 underline">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}
