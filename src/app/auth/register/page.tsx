'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.message || 'An error occurred.');
      }
    } catch {
      setError('Server error. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 px-4 ">
      <div className="p-8 bg-white rounded-3xl shadow-xl w-full max-w-md space-y-6 mt-4 mb-4">
        <h1 className="text-3xl font-extrabold text-[#0a1f44] text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-400">
                <Icon icon="mdi:account-outline" width="20" height="20" />
              </span>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
                placeholder="Jane Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
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
                placeholder="jane@example.com"
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

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-400">
                <Icon icon="mdi:account-cog-outline" width="20" height="20" />
              </span>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#0a1f44] hover:bg-[#12284c]'
            }`}
          >
            {loading ? 'Creating...' : 'Sign Up'}
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

        {/* Google Sign up */}
        <button
          onClick={() => signIn('google')}
          className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <Icon icon="flat-color-icons:google" width={24} height={24} />
          <span className="text-sm font-semibold text-gray-700">Sign up with Google</span>
        </button>

        {/* Sign in link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/auth/login" className="text-[#0a1f44] font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
