"use server";
import React from 'react';
import {Calendar17} from '@/components/calendar-17';
import CalendarTabs from '@/components/reminder';
import RecentActivity from '@/components/statereminder';
import QuickStats from '@/components/quickstats';

export default async function RemindersPage() {
  const data = await fetch('http://localhost:3000/api/reminders');
  const remindersData = await data.json();
  const dataevent = await fetch('http://localhost:3000/api/events');
  const eventsData = await dataevent.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <QuickStats />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
             <CalendarTabs reminders={remindersData.reminders} events={eventsData.events} /> 
            </div>
          </div>
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden flex items-center justify-center min-h-[600 px] p-4">
             <Calendar17 />
            </div>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden mt-6 w-full">
         <RecentActivity />
        </div>
      </div>
    </div>
  );
}