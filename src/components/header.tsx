'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Bandeau supérieur */}
      <div className="w-full border-b border-gray-200 py-3 px-4 text-sm flex justify-center bg-white text-black">
        <div className="flex items-center gap-2 text-center">
          <p className="font-medium">Get started for free</p>
          <Image src="/images/droite.png" alt="Arrow" width={16} height={16} className="inline-block" />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="w-full px-4 py-4 flex flex-wrap items-center justify-between gap-y-4 md:gap-y-0 max-w-7xl mx-auto text-black">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 text-2xl font-bold text-[#0a1f44] hover:text-[#12284c] transition">
             <Icon icon="lucide:pie-chart" className="w-7 h-7 text-[#0a1f44]" />
               SabaCRM
          </div>
        </Link>
        {/* Navigation desktop */}
        <nav className="hidden md:flex flex-wrap items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:font-bold hover:text-[#12284c] transition">Home</Link>
          <Link href="/" className="hover:font-bold hover:text-[#12284c] transition">Feautures</Link>
          <Link href="/" className="hover:text-[#12284c] hover:font-bold transition">About us </Link>
          <Link href="/dashboardgrand/help" className="hover:text-[#12284c] hover:font-bold transition">Help</Link>
          <Link href="/contactus1" className="hover:text-[#12284c] hover:font-bold transition">Contact us</Link>
        </nav>

        {/* Boutons et menu hamburger */}
        <div className="flex items-center gap-4">
          {/* Get for free */}
          <button className="bg-[#0a1f44] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#12284c] transition">
            Get for free
          </button>

          {/* Sign In */}
          {!session && (
        <button onClick={() => signIn()} className="text-sm font-medium text-[#0a1f44] hover:underline">
           Sign In
        </button>
           )}

          {/* Hamburger menu (mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden cursor-pointer p-2"
            aria-label="Toggle menu"
          >
            <Image src= "/images/menu.png" alt="Menu" width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <Link href="/" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Home</Link>
          <Link href="/" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Features</Link>
          <Link href="/" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Help</Link>
          <Link href="/" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">About us</Link>
          <Link href="/dashboardgrand/help" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Help</Link>
          <Link href="/dashboardgrand/contactus" className="block py-2 text-sm font-medium hover:text-[#12284c] transition">Contact Us</Link>

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
