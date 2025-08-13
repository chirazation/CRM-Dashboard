"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Zod schema for validation
const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').toLowerCase().trim()});
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setServerError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgotpass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(result.message);
        reset(); 
      } else {
        setServerError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = '/auth/login';
  };
  const handleTryAgain = () => {
    setIsSuccess(false);
    setMessage('');
    setServerError('');
    reset();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Check Your Email
              </h2>
              <div className="mt-4 p-4 bg-green-50 rounded-md">
                <p className="text-sm text-green-800">{message}</p>
              </div>
              <div className="mt-6 text-sm text-gray-600">
                <p>Did not receive the email? Check your spam folder or</p>
                <button
                  onClick={handleTryAgain}
                  className="font-medium hover:underline"
                  style={{ color: '#0a1f44' }}>
                  try again
                </button>
              </div>
              <button
                onClick={handleBackToLogin}
                className="mt-6 flex items-center justify-center w-full px-4 py-2 border text-sm font-medium rounded-md text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#0a1f44', borderColor: '#0a1f44' }}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12" style={{ color: '#0a1f44' }} />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Forgot Password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm transition-colors ${
                    errors.email 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-transparent'
                  }`}
                  style={!errors.email ? { color: '#0a1f44' } : {}}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  onChange={() => {
                    if (serverError) setServerError(''); }}/>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {serverError && (
              <div className="flex items-center p-4 bg-red-50 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                <p className="text-sm text-red-800">{serverError}</p>
              </div>
            )}

            <div>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading || !isValid}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                style={{ backgroundColor: '#0a1f44'}}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Reset Link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-sm font-medium flex items-center justify-center w-full hover:underline"
                style={{ color: '#0a1f44' }}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}