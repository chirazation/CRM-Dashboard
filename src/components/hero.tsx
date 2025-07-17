'use client';

import Image from 'next/image';
import { StatsSection } from '@/components/StatsSection';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-image.jpg"
            alt="CRM Hero Background"
            fill
            quality={100}
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#243457]/90 to-[#0000]/90"></div>
        </div>

        <div className="relative z-10  text-center ">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Master Your Relationships, Boost Your Growth
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 ml-2.5 mr-2.5">
            SabaCRM helps you manage your customers, leads, and opportunities with ease.
            Centralize your data, track your performance, and collaborate effectively with your team
            through a modern and intuitive interface. Whether you’re a startup or a growing company,
            give your customer relationships the power they deserve.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#0a1f44] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
              Get for free
            </button>
            <Link href="/auth/register">
            <button className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#0a1f44] transition">
              Register now 
            </button>
            </Link>
          </div>

          {/* ▶️ Video Demo Button */}
          <div className="mt-6">
            <button className="flex items-center gap-2 text-white hover:text-blue-300 transition">
              <Icon icon="mdi:play-circle-outline" className="text-2xl" />
              Watch the video demo
            </button>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className=" bg-gray-100 py-8 px-6 w-full">
        <StatsSection />
      </section>

      {/* CHECKLIST */}
       <section className="bg-white py-16 px-6 w-full">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#0a1f44] mb-6">
          Why Choose SabaCRM?
        </h2>
        <ul className="text-left text-gray-700 space-y-4 max-w-xl mx-auto">
          <li className="flex items-start gap-3 hover:text-[#0a1f44] transition">
            <Icon icon="lucide:rocket" className="text-[#0a1f44] mt-1" />
            Real-time lead tracking
          </li>
          <li className="flex items-start gap-3 hover:text-[#0a1f44] transition">
            <Icon icon="lucide:users" className="text-[#0a1f44] mt-1" />
            Simplified team collaboration
          </li>
          <li className="flex items-start gap-3 hover:text-[#0a1f44] transition">
            <Icon icon="lucide:layout-dashboard" className="text-[#0a1f44] mt-1" />
            Modern and intuitive interface
          </li>
          <li className="flex items-start gap-3 hover:text-[#0a1f44] transition">
            <Icon icon="lucide:shield-check" className="text-[#0a1f44] mt-1" />
            Guaranteed security and performance
          </li>
        </ul>
      </div>
    </section>

      {/* SIGNUP FORM */}
      <section className="bg-gray-100 py-16 px-6 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0a1f44] mb-4">
            Try SabaCRM for Free
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of businesses who trust us.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg w-full sm:w-auto text-black border border-gray-300"
            />
            <button className="bg-[#0a1f44] text-white px-6 py-3 rounded-lg hover:bg-[#12284c] transition font-semibold">
              Get Started Now
            </button>
          </form>
        </div>
      </section>

      {/* INTEGRATIONS / LOGOS */}
       <section className="py-12 px-6 bg-white w-full">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-lg text-gray-600 mb-4">Available Integrations</h3>
        <div className="flex flex-wrap justify-center gap-10 ">
          <Icon icon="logos:slack-icon" width="40" height="40" />
          <Icon icon="logos:google-gmail" width="40" height="40" />
          <Icon icon="logos:notion-icon" width="40" height="40" />
          <Icon icon="logos:stripe" width="40" height="40" />
          <Icon icon="logos:zapier-icon" width="40" height="40" />
        </div>
      </div>
    </section>

      {/* TESTIMONIAL */}
      <section className="bg-[#0a1f44] text-white py-16 px-6 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl italic mb-4">
            “SabaCRM completely transformed the way we manage our leads. It’s simple, fast, and powerful.”
          </blockquote>
          <p className="font-semibold">— Sarah B., CEO of TechStart</p>
        </div>
      </section>
    </main>
  );
};
