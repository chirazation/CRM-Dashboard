import React from 'react';
import {Calendar17} from '@/components/calendar-17';
import CalendarTabs from '@/components/reminder';


export default function ContactsPage() {
  return (
  <div>
    <div className='flex flex-colflex p-4 gap-4'>
      <div className="w-2/3 bg-white rounded-xl shadow p-4">
    <CalendarTabs/>
    </div>
    <div className="w-1/3 bg-white rounded-xl shadow p-4 ">
    <Calendar17/>
    </div>
    
    </div>
  </div>
  );
}