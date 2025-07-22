'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-[#0a1f44] py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Block 1 - Logo / Name */}
        <div>
          <h2 className="text-2xl font-bold mb-4">SabaCRM</h2>
          <p className="text-sm text-[#12284c]">
            Empower your customer management with a modern, intuitive, and powerful platform.
          </p>
        </div>

        {/* Block 2 - Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm text-[#12284c]">
            <li>
              <Link href="/" className="hover:text-[#0a1f44] font-medium transition">Home</Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-[#0a1f44] font-medium transition">Features</Link>
            </li>
            <li>
              <Link href="/aboutus" className="hover:text-[#0a1f44] font-medium transition">About us</Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:text-[#0a1f44] font-medium transition">Contact us</Link>
            </li>
          </ul>
        </div>

        {/* Block 3 - Newsletter / Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md border border-gray-300 text-[#0a1f44] bg-white"
              required
            />
            <button className="bg-[#0a1f44] text-white px-4 py-2 rounded-md hover:bg-[#12284c] font-semibold transition">
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-4 text-xl text-[#0a1f44]">
            {/* Social Icons */}
            <a href="#" className="hover:text-[#12284c] transition" aria-label="Facebook">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.5228-4.4772-10-10-10S2 6.4772 2 12c0 4.9915 3.657 9.1281 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.877C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-[#12284c] transition" aria-label="Twitter">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14.86 4.48 4.48 0 0 0 1.98-2.48 9.03 9.03 0 0 1-2.88 1.1 4.52 4.52 0 0 0-7.7 4.13A12.9 12.9 0 0 1 1.64 2.16 4.49 4.49 0 0 0 3 9.72 4.43 4.43 0 0 1 .86 9v.05a4.52 4.52 0 0 0 3.62 4.43 4.52 4.52 0 0 1-2.04.07 4.53 4.53 0 0 0 4.22 3.13A9.06 9.06 0 0 1 0 19.54a12.87 12.87 0 0 0 7 2.05c8.41 0 13-7 13-13 0-.2 0-.39-.02-.58A9.22 9.22 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-[#12284c] transition" aria-label="LinkedIn">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-9 14v-5H7v5h3zm-1.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7.5 6.5v-3a1.5 1.5 0 0 0-3 0v3h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#0a1f44]/20 mt-10 pt-6 text-center text-sm text-[#12284c]">
        © {new Date().getFullYear()} SabaCRM. All rights reserved.
      </div>
    </footer>
  );
}
