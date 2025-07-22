'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod schema
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setError('Invalid email or password.');
    } else {
      router.push('/dashboardgrand');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="p-8 bg-white rounded-3xl shadow-xl w-full max-w-md space-y-6">
        <h1 className="text-3xl font-extrabold text-[#0a1f44] text-center">Sign In</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
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
                id="email"
                {...register('email')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
                placeholder="your@email.com"
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

          {/* Forgot Password */}
          <div className="flex justify-end text-sm">
            <a href="/auth/forgotpass" className="text-[#0a1f44] hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          {/* Auth Error */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
          onClick={() => signIn('google', { callbackUrl: '/dashboardgrand' })}
          className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <Icon icon="flat-color-icons:google" width="24" height="24" />
          <span className="text-sm font-semibold text-gray-700">Sign in with Google</span>
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
