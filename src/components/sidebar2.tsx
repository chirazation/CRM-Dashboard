'use client';
import React from 'react';
import { Icon } from '@iconify/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Sidebar2() {
  return (
    <div className="fixed top-0 left-0 h-screen w-15 bg-[#0a1f44] flex flex-col justify-between items-center py-4 z-50 md:hidden ">
      {/* Section supérieure : logo + navigation */}
      <div className="flex flex-col items-center space-y-6">
        {/* Logo */}
        <div className="mb-4">
          <Icon icon="lucide:pie-chart" className="w-7 h-7 text-white" />
        </div>

        {/* Navigation icons */}
        <Link href={"/dashboardgrand/dashboard"}>
        <button className="hover:bg-gray-200 p-2 rounded" aria-label="dashboard">
          <Icon icon="lucide:layout-dashboard" className="w-5 h-5 text-white" />
        </button>
        </Link>
        
        <Link href={"/dashboardgrand/leads"}>
        <button className="hover:bg-gray-200 p-2 rounded" aria-label="leads">
          <Icon icon="lucide:users-round" className="w-5 h-5 text-white" />
        </button>
        </Link>
        <Link href={"/dashboardgrand/reminders"}>
        <button className="hover:bg-gray-200 p-2 rounded" aria-label="reminders">
          <Icon icon="lucide:alarm-clock" className="w-5 h-5 text-white" />
        </button>
        </Link>
        
        <Link href={"/dashboardgrand/help"}>
        <button className="hover:bg-gray-200 p-2 rounded" aria-label="help">
          <Icon icon="lucide:help-circle" className="w-5 h-5 text-white" />
        </button>
        </Link>
      </div>

      {/* Bouton Sign Out en bas */}
      <div>
        <button
          onClick={() => signOut()}
          className="hover:bg-red-200 p-2 rounded"
          aria-label="sign-out"
        >
          <Icon icon="lucide:log-out" className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
