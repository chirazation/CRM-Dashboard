'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import arrow from '@/app/images/droite.png';
import Menuicon from '@/app/images/menu.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Bandeau supérieur */}
      <div className="w-full border-b border-gray-200 py-3 px-4 text-sm flex justify-center bg-white text-black">
        <div className="flex items-center gap-2 text-center">
          <p className="font-medium">Get started for free</p>
          <Image src={arrow} alt="Arrow" width={16} height={16} className="inline-block" />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="w-full px-4 py-4 flex flex-wrap items-center justify-between gap-y-4 md:gap-y-0 max-w-7xl mx-auto text-black">
        {/* Logo */}
        <Link href={"/"}>
        <div className="text-2xl font-bold">SabaCRM</div>
        </Link>
        {/* Navigation desktop */}
        <nav className="hidden md:flex flex-wrap items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="hover:text-[#12284c] transition">Dashboard</Link>
          <Link href="/companies" className="hover:text-[#12284c] transition">Companies</Link>
          <Link href="/leads" className="hover:text-[#12284c] transition">Leads</Link>
          <Link href="/reminders" className="hover:text-[#12284c] transition">Reminders</Link>
          <Link href="/help" className="hover:text-[#12284c] transition">Help</Link>
          <Link href="/contacts" className="hover:text-[#12284c] transition">Contacts</Link>
          <Link href="/contactus" className="hover:text-[#12284c] transition">Contact Us</Link>
        </nav>

        {/* Boutons et menu hamburger */}
        <div className="flex items-center gap-4">
          {/* Get for free */}
          <button className="bg-[#0a1f44] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#12284c] transition">
            Get for free
          </button>

          {/* Sign In / Sign Out */}
          {session ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium hidden md:inline text-gray-600">
                Hi, {session.user?.name?.split(' ')[0] || 'User'}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-sm font-medium text-[#0a1f44] hover:underline"
            >
              Sign In
            </button>
          )}

          {/* Hamburger menu (mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden cursor-pointer p-2"
            aria-label="Toggle menu"
          >
            <Image src={Menuicon} alt="Menu" width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <Link href="/dashboard" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Dashboard</Link>
          <Link href="/companies" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Companies</Link>
          <Link href="/leads" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Leads</Link>
          <Link href="/reminders" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Reminders</Link>
          <Link href="/help" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Help</Link>
          <Link href="/contacts" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Contacts</Link>
          <Link href="/contactus" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Contact Us</Link>

          {/* Mobile Sign In / Out */}
          {session ? (
            <button
              onClick={() => signOut()}
              className="block mt-4 text-sm font-medium text-red-600 hover:underline"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="block mt-4 text-sm font-medium text-[#0a1f44] hover:underline"
            >
              Sign In
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
