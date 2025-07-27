'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// Schéma de validation Zod
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone must be at least 8 digits").regex(/^[0-9]+$/, "Phone must contain only numbers"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: FormData) => {
    // Ici, tu peux appeler une API pour envoyer les données
    console.log(data);
    setStatus('Thank you for reaching out! We’ll get back to you shortly.');
    reset();

    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6 mt-8 mb-7">
      <h2 className="text-3xl font-bold text-center text-[#0A1F44] mb-4">
        Contact Support
      </h2>

      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block mb-1 text-base font-medium text-[#1F2937]">
          Full Name
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-gray-400">
            <Icon icon="mdi:account-outline" width="20" height="20" />
          </span>
          <input
            id="name"
            {...register('name')}
            placeholder="John Doe"
            className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/30 transition ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-1 text-base font-medium text-[#1F2937]">
          Email Address
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-gray-400">
            <Icon icon="mdi:email-outline" width="20" height="20" />
          </span>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your.email@company.com"
            className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/30 transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      {/* Phone */}
      <div>
  <label htmlFor="phone" className="block mb-1 text-base font-medium text-[#1F2937]">
    Phone Number
  </label>
  <div className="relative">
    <span className="absolute left-4 top-3.5 text-gray-400">
      <Icon icon="mdi:phone-outline" width="20" height="20" />
    </span>
    <input
      id="phone"
      {...register('phone')}
      placeholder="12345678"
      className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/30 transition ${
        errors.phone ? 'border-red-500' : 'border-gray-300'
      }`}
    />
  </div>
  {errors.phone && (
    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
  )}
</div>


      {/* Message */}
      <div>
        <label htmlFor="message" className="block mb-1 text-base font-medium text-[#1F2937]">
          Your Message
        </label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-gray-400">
            <Icon icon="mdi:message-text-outline" width="20" height="20" />
          </span>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            placeholder="Let us know how we can help..."
            className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/30 transition resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-[#0A1F44] text-white font-semibold rounded-xl hover:bg-[#12284C] transition-colors text-lg"
      >
        Send Message
      </button>

      {/* Status Message */}
      {status && (
        <p className="mt-4 text-center text-green-600 font-medium text-base">
          {status}
        </p>
      )}
    </form>
  );
}
