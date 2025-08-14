'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';


const roles = ['sales', 'admin'] as const;


const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(roles),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'sales',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json(); 

      if (res.ok) {
        setUser(json.user); 
        setError('');
        if (json.user) {
          router.push('/auth/login');
        }
      } else {
        setError(json.message || 'An error occurred.');
      }
    } catch {
      setError('Server error. Please try again later.');
    }

    setLoading(false);
  };

  if (user) {
    return (
      <div className="p-8 bg-white rounded-3xl shadow-xl w-full max-w-md space-y-6 mt-4 mb-4 text-center">
        <h2 className="text-2xl font-semibold text-[#0a1f44]">Hi, {user.name}!</h2>
        <p className="mt-4">Your account has been created successfully.</p>
        <button
          onClick={() => router.push('/dashboardgrand')}
          className="mt-6 px-6 py-3 bg-[#0a1f44] text-white rounded-xl hover:bg-[#12284c]"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <div className="p-8 bg-white rounded-3xl shadow-xl w-full max-w-md space-y-6 mt-4 mb-4">
        <h1 className="text-3xl font-extrabold text-[#0a1f44] text-center">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
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
                id="name"
                {...register('name')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
                placeholder="Jane Doe"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
                id="email"
                {...register('email')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
                placeholder="jane@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
                id="password"
                {...register('password')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
                id="role"
                {...register('role')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === 'sales' ? 'Sales' : 'Admin'}
                  </option>
                ))}
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
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0a1f44] hover:bg-[#12284c]'
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
          <Link href="/auth/login" className="text-[#0a1f44] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
