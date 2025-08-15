'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from "react";

export default function RemindersButton() {
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    const fetchTodayReminders = async () => {
      try {
        const res = await fetch("/api/reminders/today");
        const data = await res.json();
        setTodayCount(data.count || 0);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };
    fetchTodayReminders();
  }, []);

  const { data: session } = useSession();

  return (
    <>
      <div className="sticky top-0 z-40 bg-[#F9FAFB] w-full py-4 px-6 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <div className="hidden md:flex items-center gap-2 text-2xl font-bold text-[#0a1f44] hover:text-[#12284c] transition fixed">
          <Link href="/" className="flex items-center gap-2">
            <Icon icon="lucide:pie-chart" className="w-7 h-7 text-[#0a1f44]" />
            SabaCRM
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 flex justify-center px-2 sm:px-4 md:px-6 sm:ml-10">
         <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
         </div>
        </div>

        {/* Icons + Hi User */}
        <div className="flex items-center gap-2">
          {session?.user && (
            <span className="text-sm text-[#0a1f44] font-medium">
              Hi, {session.user.name || session.user.email}
            </span>
          )}
          <Link href="/dashboardgrand/help">
          <button onClick={() => alert('Help clicked!')} className="hover:bg-gray-200 p-2 rounded-full" aria-label="Help">
            <Icon icon="mdi:help-circle" className="w-5 h-5 text-[#0a1f44]" />
          </button>
          </Link>
          <button onClick={() => alert('Settings clicked!')} className="hover:bg-gray-200 p-2 rounded-full" aria-label="Settings">
            <Icon icon="lucide:settings" className="w-5 h-5 text-[#0a1f44]" />
          </button>
          <Link href="/dashboardgrand/reminders">
         <button className="relative hover:bg-gray-200 p-2 rounded-full" aria-label="Notifications">
           <Icon icon="mdi:bell" className="w-5 h-5 text-[#0a1f44]" />
            {todayCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-3 h-3 flex items-center justify-center">
                {todayCount}
             </span>
            )}
         </button>

          </Link>
          <Link href="/dashboardgrand/profile">
          <button onClick={() => alert('Profile clicked!')} className="hover:bg-gray-200 p-2 rounded-full" aria-label="Profile">
            <Icon icon="lucide:user" className="w-5 h-5 text-[#0a1f44]" />
          </button>
          </Link>
          
        </div>
      </div>
    </>
  );
}
