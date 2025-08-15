'use client';

import { useState } from 'react';
import { Plus, Calendar, Bell } from 'lucide-react';
import EventForm from '@/components/eventform';
import ReminderForm from '@/components/reminderform';
import { ReminderCard } from './remindercard';
import { EventCard } from './eventcard';

type TabKey = 'Events' | 'Reminders';
const tabs: TabKey[] = ['Events', 'Reminders'];
const tabIcons = { Events: Calendar, Reminders: Bell };
const buttonConfig = {
  Events: {
    text: 'Add New Event',
    icon: Calendar,
    gradient: 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800'
  },
  Reminders: {
    text: 'Add New Reminder',
    icon: Bell,
    gradient: 'bg-gradient-to-r from-green-700 via-green-600 to-green-700 hover:from-green-600 hover:to-green-800'
  }
};
type Props = {
  reminders: Reminder[]
  events: Event[]
}
export type Reminder = {
  id: string;
  title: string;
  description: string;
  reminderDate: Date;
  note: string;
  createdAt: Date;
}
export type Event = {
  id: string;
  title: string;
  description: string;
  eventDate: Date;
  location: string;
  createdAt: Date;
}

export default function CalendarTabs({ reminders , events} : Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('Events');
  const [showForm, setShowForm] = useState(false);

  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dayNum = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const renderForm = () => {
    return activeTab === 'Events' ? (
      <EventForm/>
    ) : (
      <ReminderForm />
    );
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/15 backdrop-blur-md rounded-xl mb-3 shadow-inner">
            <span className="text-2xl font-bold">{dayNum}</span>
          </div>
          <h2 className="text-2xl font-semibold mb-1 tracking-wide">{month}</h2>
          <p className="text-slate-300 text-sm font-medium">{day}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 py-4 bg-gray-50/70">
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl shadow-inner" role="group">
          {tabs.map((tab) => {
            const Icon = tabIcons[tab];
            return (
              <button
                key={tab}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white text-slate-800 shadow-md transform scale-[1.03]'
                    : 'text-gray-600 hover:text-slate-700 hover:bg-white/40'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <Icon size={16} />
                <span>{tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Section - Takes remaining space */}
      <div className="flex-1 px-4 pb-4 flex flex-col min-h-0">
        <div className="flex-1 mb-4 min-h-0">
          {activeTab === 'Events' ? (
            <div className="bg-gray-50/80 rounded-xl h-full p-4 shadow-inner">
              <div className="h-full overflow-y-auto pr-1">
                <div className="flex flex-col gap-3">
                  {events.map((event) => (
                    <EventCard 
                      key={event.id}
                      id={event.id} 
                      title={event.title}
                      description={event.description}
                      date={event.eventDate}
                      location={event.location}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50/80 rounded-xl h-full p-4 shadow-inner">
              <div className="h-full overflow-y-auto pr-1">
                <div className="flex flex-col gap-3">
                  {reminders.map((reminder) => (
                    <ReminderCard 
                      key={reminder.id}
                      id={reminder.id} 
                      title={reminder.title}
                      description={reminder.description}
                      date={reminder.reminderDate}
                      note={reminder.note}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Button */}
        <button
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg ${buttonConfig[activeTab].gradient}`}
          onClick={() => setShowForm(true)}
        >
          <Plus size={16} />
          {buttonConfig[activeTab].text}
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
            onClick={handleCloseForm}
          ></div>
          <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto border border-white/30">
            {activeTab === 'Events' && (
              <button
                onClick={handleCloseForm}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                ✕
              </button>
            )}
            <div className="p-6">
              {renderForm()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}