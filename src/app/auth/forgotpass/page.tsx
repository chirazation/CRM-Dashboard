'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema de validation Zod
const schema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [message, setMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: FormData) => {
    setMessage('');
    setServerError('');

    try {
      // Ici tu peux appeler ton API pour envoyer l'email
      // const res = await fetch('/api/forgot-password', { ... });

      // Simule une réponse de succès :
      setMessage(`If an account with ${data.email} exists, a password reset link has been sent.`);
      reset();
    } catch (err) {
      console.error(err);
      setServerError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0a1f44]">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {...register('email')}
              className="w-full border border-gray-300 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/40"
              placeholder="you@example.com"
            />
          </div>

          {/* Validation error */}
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}

          {/* Server error */}
          {serverError && <p className="text-red-600 text-sm">{serverError}</p>}

          {/* Message */}
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
