'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(' Thank you for reaching out! We’ll get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto  p-6 bg-white rounded-2xl shadow-lg space-y-6 mt-6 mb-4"
    >
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
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/30 transition"
          />
        </div>
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
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@company.com"
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/30 transition"
          />
        </div>
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
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Let us know how we can help..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/30 transition resize-none"
          />
        </div>
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
