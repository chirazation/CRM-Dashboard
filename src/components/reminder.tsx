'use client';

import { useState } from 'react';
import { Plus, Calendar, Bell } from 'lucide-react';
import EventForm from '@/components/eventform';
import ReminderForm from '@/components/reminderform';
import { ReminderCard } from './remindercard';

type TabKey = 'Events' | 'Reminders';
const tabs: TabKey[] = ['Events', 'Reminders'];
const tabIcons = { Events: Calendar, Reminders: Bell };
const buttonConfig = {
  Events: {
    text: 'Add New Event',
    icon: Calendar,
    gradient: 'bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-700 hover:to-blue-800'
  },
  Reminders: {
    text: 'Add New Reminder',
    icon: Bell,
    gradient: 'bg-gradient-to-r from-green-900 to-green-800 hover:from-green-700 hover:to-green-800'
  }
};
type Props = {
  reminders: Reminder[]
}
export type Reminder = {
  id: string;
  title: string;
  description: string;
  reminderDate: Date;
  note: string;
  createdAt: Date;
}

export default function CalendarTabs({ reminders } : Props) {
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
      <EventForm onCancel={handleCloseForm} onSave={handleCloseForm} />
    ) : (
      <ReminderForm />
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 w-full max-w-lg">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 px-6 py-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl mb-3">
              <span className="text-2xl font-bold">{dayNum}</span>
            </div>
            <h2 className="text-xl font-semibold mb-1">{month}</h2>
            <p className="text-slate-300 text-sm font-medium">{day}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 py-4 bg-gray-50/50">
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg" role="group">
            {tabs.map((tab) => {
              const Icon = tabIcons[tab];
              return (
                <button
                  key={tab}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-white text-slate-800 shadow-sm transform scale-[1.02]'
                      : 'text-gray-600 hover:text-slate-700 hover:bg-white/50'
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

        {/* Content Section */}
        <div className="px-4 pb-4 overflow-y-auto">
          <div className="min-h-[160px] mb-4">
            {activeTab === 'Events' ? (
              <div className="flex items-center justify-center h-40 text-gray-500 text-sm italic bg-gray-50 rounded-lg">
                No events to display.
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg  min-h-[160px] gap-4 ">
                <div className='flex flex-col gap-2 max-h-60 overflow-y-auto'>
                  {reminders.map((reminder) => {
                  return (
                    <ReminderCard 
                      key={reminder.id}
                      title={reminder.title}
                      description={reminder.description}
                      date={reminder.reminderDate}
                      note={reminder.note}
                    />
                  )
                })}
                </div>
              </div>
            )}
          </div>

          {/* Add Button */}
          <button
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg ${buttonConfig[activeTab].gradient}`}
            onClick={() => setShowForm(true)}
          >
            <Plus size={16} />
            {buttonConfig[activeTab].text}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
            onClick={handleCloseForm}
          ></div>
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
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