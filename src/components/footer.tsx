'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer" className="bg-white text-[#0a1f44] py-12 px-6 ">
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
              <Link href="/feautures" className="hover:text-[#0a1f44] font-medium transition">Features</Link>
            </li>
            <li>
              <Link href="#footer" className="hover:text-[#0a1f44] font-medium transition">About us</Link>
            </li>
            <li>
              <Link href="/contactus1" className="hover:text-[#0a1f44] font-medium transition">Contact us</Link>
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
            <Link href="https://www.facebook.com/visioad" className="hover:text-[#12284c] transition" aria-label="Facebook">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.5228-4.4772-10-10-10S2 6.4772 2 12c0 4.9915 3.657 9.1281 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.877C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </Link>
            <Link href="https://www.instagram.com/ste_visioad/" className="hover:text-[#12284c] transition" aria-label="Instagram">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.75 2.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Z" />
</svg>

            </Link>
            <Link href="https://www.linkedin.com/company/stevisioad/" className="hover:text-[#12284c] transition" aria-label="LinkedIn">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-9 14v-5H7v5h3zm-1.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7.5 6.5v-3a1.5 1.5 0 0 0-3 0v3h3z"/>
              </svg>
            </Link>
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
