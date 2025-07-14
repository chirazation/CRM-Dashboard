'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setError('Invalid email or password.');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0a1f44] px-4">
      <div className="p-8 bg-white rounded-3xl shadow-xl w-full max-w-md space-y-6">
        <h1 className="text-3xl font-extrabold text-[#0a1f44] text-center">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-400">
                <Icon icon="mdi:email-outline" width="20" height="20" />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-400">
                <Icon icon="mdi:lock-outline" width="20" height="20" />
              </span>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end text-sm">
            <a href="/auth/forgotpass" className="text-[#0a1f44] hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#0a1f44] text-white font-semibold rounded-xl hover:bg-[#12284c] transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative text-sm text-gray-500 bg-white px-4 text-center">
            or continue with
          </div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <Icon icon="flat-color-icons:google" width="24" height="24" />
          <span className="text-sm font-semibold text-gray-700">
            Sign in with Google
          </span>
        </button>

        {/* Sign up link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/auth/register" className="text-[#0a1f44] font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
