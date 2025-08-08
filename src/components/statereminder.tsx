import React from 'react';
import { Calendar, Bell, CheckSquare, TrendingUp } from 'lucide-react';


export default function RecentActivity() {
  const activities = [
    { action: 'Created new event', item: 'Team Meeting', time: '2 min ago', icon: Calendar, color: 'text-blue-600' },
    { action: 'Completed task', item: 'Review Documents', time: '1 hour ago', icon: CheckSquare, color: 'text-green-600' },
    { action: 'Set reminder', item: 'Call Client', time: '3 hours ago', icon: Bell, color: 'text-orange-600' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.item}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}