'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    

    setMessage(`If an account with ${email} exists, a password reset link has been sent.`);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0a1f44]">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-gray-400">
              <Icon icon="mdi:email-outline" width="20" height="20" />
            </span>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
              placeholder="you@example.com"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full bg-[#0a1f44] text-white py-3 rounded-xl hover:bg-[#12284c] transition font-semibold"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <a href="/auth/login" className="text-[#0a1f44] hover:underline font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
