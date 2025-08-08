import React from 'react';
import { Calendar, Bell, CheckSquare } from 'lucide-react';
export default function QuickStats() {
  const stats = [
    { label: 'Today\'s Events', value: '4', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Tasks', value: '7', icon: CheckSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Reminders', value: '3', icon: Bell, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
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