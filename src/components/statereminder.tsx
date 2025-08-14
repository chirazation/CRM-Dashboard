'use client';
import React, { useEffect, useState } from 'react';
import { Calendar, Bell, CheckSquare, TrendingUp } from 'lucide-react';

type Activity = {
  action: string;
  item: string;
  time: string;
  icon: React.ElementType;
  color: string;
};

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/recent-activities'); 
        const data = await res.json();
        console.log('API data:', data);
        const now = new Date();
        const formattedActivities: Activity[] = [];

        formattedActivities.push({
        action: data.latestPassedEvent ? 'Past event' : 'No past event',
        item: data.latestPassedEvent?.name || '—',
        time: data.latestPassedEvent? formatTimeAgo(new Date(data.latestPassedEvent.eventDate), now): '-',icon: CheckSquare,
        color: data.latestPassedEvent ?'text-green-600' : 'text-gray-400',
        });
        formattedActivities.push({
        action: data.latestEvent ? 'Created new event' : 'No event',
        item: data.latestEvent?.name || '—',
        time: data.latestEvent? formatTimeAgo(new Date(data.latestEvent.createdAt), now): '-',
        icon: Calendar,
        color: data.latestEvent ? 'text-blue-600' : 'text-gray-400',
        });

        formattedActivities.push({
        action: data.latestReminder ? 'Set reminder' : 'No reminder',
        item: data.latestReminder?.title || '—',
        time: data.latestReminder? formatTimeAgo(new Date(data.latestReminder.createdAt), now): '-',
        icon: Bell,
        color: data.latestReminder ? 'text-orange-600' : 'text-gray-400',
        });

        setActivities(formattedActivities);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);
  const formatTimeAgo = (date: Date, now: Date) => {
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); 
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };
  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

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
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
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
