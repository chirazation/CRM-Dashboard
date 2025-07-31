'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ReminderForm } from '@/components/reminderform';

type TabKey = 'Events' | 'Reminders' | 'To-do List';

const tabs: TabKey[] = ['Events', 'Reminders', 'To-do List'];

const mockData: Record<TabKey, { time: string; title: string; desc: string; color?: string }[]> = {
  Events: [{ time: '9:00 AM - 11:00 AM', title: 'Team Meeting', desc: 'Sprint Planning at Zoom' }, ],
  Reminders: [{time: '8:00 AM TO 9:00 AM',title: 'Daily Tasks',desc: 'Meditate  Exercise',color: 'bg-gray-200',},],
  'To-do List': [{time: 'All Day',title: 'Finish CRM Dashboard UI',desc: 'With Tailwind and React',},],
};

export default function CalendarTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('Reminders');
  const [showForm, setShowForm] = useState(false);
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dayNum = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const handleCloseForm = () => {setShowForm(false);};

  return (
    <div className="max-w mx-auto p-6 bg-white rounded-2xl shadow hidden sm:block">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">{dayNum} {month}</h2>
        <p className="text-[#12284c] text-lg">{day}</p>
      </div>

      <div className="flex justify-center gap-2 mb-6" role="group">
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

      <button
        className="px-4 py-2 text-sm rounded-md bg-[#12284C] text-white font-semibold hover:bg-gray-500 transition duration-200 mt-4 justify-center"
        onClick={() => setShowForm(true)}
      >
        + Add new Event
      </button>
      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300">
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md  relative  ">
              <button onClick={handleCloseForm} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                ✕
              </button>
              <ReminderForm/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
