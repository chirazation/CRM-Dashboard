'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type TabKey = 'Events' | 'Reminders' | 'To-do List';

const tabs: TabKey[] = ['Events', 'Reminders', 'To-do List'];

const mockData: Record<TabKey, { time: string; title: string; desc: string; color?: string }[]> = {
  Events: [
    { time: '9:00 AM - 11:00 AM', title: 'Team Meeting', desc: 'Sprint Planning at Zoom' },
    { time: '1:00 PM - 2:00 PM', title: 'Webinar', desc: 'Frontend Trends 2025' },
  ],
  Reminders: [
    {
      time: '8:00 AM TO 9:00 AM',
      title: 'Daily Tasks',
      desc: 'Meditate  Exercise',
      color: 'bg-gray-200',
    },
    {
      time: '10:00 AM TO 1:00 PM',
      title: 'Office Tasks',
      desc: 'Submit Reports, Check Emails & Attend Meetings',
      color: 'bg-red-300',
    },
    {
      time: '3:00 PM TO 4:00 PM',
      title: 'Appointments',
      desc: 'Dental Doctor’s Appointments',
      color: 'bg-green-200',
    },
    {
      time: '8:00 PM TO 9:00 PM',
      title: 'Study & Learning',
      desc: 'Join Online Advance Excel Webinars',
      color: 'bg-blue-200',
    },
  ],
  'To-do List': [
    {
      time: 'All Day',
      title: 'Finish CRM Dashboard UI',
      desc: 'With Tailwind and React',
    },
    {
      time: 'Evening',
      title: 'Workout',
      desc: 'Leg day at gym',
    },
  ],
};

export default function CalendarTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('Reminders');
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dayNum = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <div className="max-w mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">{dayNum} {month}</h2>
        <p className="text-[#12284c] text-lg">{day}</p>
      </div>
      
      <div className="flex justify-center gap-2 mb-6 " role="group">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn(
              'px-4 py-2 rounded-md border font-medium text-sm',
              activeTab === tab
                ? 'bg-[#12284c] text-white'
                : 'bg-white text-[#12284c] border-gray-300 hover:bg-gray-100'
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {mockData[activeTab].map((item, index) => (
          <div
            key={index}
            className={cn(
              'rounded-lg p-4 shadow-sm',
              activeTab === 'Reminders' && item.color ? item.color : 'bg-gray-100'
            )}
          >
            <p className="text-sm text-gray-500 mb-1">{item.time}</p>
            <h3 className="text-md font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>

      <button className='px-4 py-2 text-sm rounded-md bg-[#12284C] text-white font-semibold hover:bg-gray-500 transition duration-200 mt-4 justify-center'> 
              + Add new Event 
      </button> 
    </div>
  );
}
