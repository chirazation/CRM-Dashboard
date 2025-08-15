import React from 'react';
import SideNav from '@/components/Sidebar';
import Headergrand from '@/components/headergrand';
import Sidebar2 from '@/components/sidebar2';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Headergrand />
      <div className='flex flex-1 overflow-hidden'>
        <SideNav />
        <Sidebar2 />
        <main className="flex-1 overflow-y-auto sm:ml-15 md:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}



