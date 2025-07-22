
import React from 'react';
import SideNav from '@/components/Sidebar';
import Headergrand from '@/components/headergrand'
import Sidebar2 from '@/components/sidebar2';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Headergrand/>
      <div className='flex flex-1 min-h-screen'>
      <SideNav/>
      <Sidebar2 />
      <main className="flex-1 bg-gray-50 ml-[60px] lg:ml-0 lg:overflow-auto">{children}</main>
      </div>
       
    </div>
  );
}



