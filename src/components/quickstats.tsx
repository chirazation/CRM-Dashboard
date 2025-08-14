'use client';
import React,{useState,useEffect} from 'react'
import { Calendar, Bell ,CalendarCheck} from 'lucide-react';
export default function QuickStats() {
  const [counts, setCounts] = useState({
           todayreminders: 0,
           upcomevent: 0,
           todayevents: 0,
        });
      
        useEffect(() => {
          const fetchStats = async () => {
            const res = await fetch('/api/topstatreminder');
            const data = await res.json();
            setCounts(data);
          };
          fetchStats();
        }, []);
  const stats = [
    { label: 'Today\'s Events', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Today\'s Reminders', icon: Bell, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Upcoming Events', icon: CalendarCheck, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">
               {stat.label === "Today's Events" ? counts.todayevents :
                stat.label === "Today's Reminders" ? counts.todayreminders :
                counts.upcomevent}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}