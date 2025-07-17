// app/dashboard/layout.tsx
import React from 'react';
import SideNav from '@/components/Sidebar';
import Headergrand from '@/components/headergrand'
import Sidebar2 from '@/components/sidebar2';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Headergrand/>
      <SideNav />
      <Sidebar2 />
      <main className="flex-1 ml-8 md:ml-60 sm:ml-15">{children}</main>
    </div>
  );
}



