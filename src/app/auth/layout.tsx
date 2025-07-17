// app/dashboard/layout.tsx
import React from 'react';
import Footer from '@/components/footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" min-h-screen">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
