"use client";

import * as React from "react";
import { CalendarDays, AlarmClock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

type EventType = {
  id: number;
  title: string;
  description: string;
  date: Date;
  location?: string;
};

type ReminderType = {
  id: number;
  title: string;
  description: string;
  datereminder: Date;
  note?: string;
};

export function Calendar17() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 12));
  const [events, setEvents] = React.useState<EventType[]>([]);
  const [reminders, setReminders] = React.useState<ReminderType[]>([]);
  const [loading, setLoading] = React.useState(false);

  function formatDate(date?: Date) {
    if (!date) return "";
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().split("T")[0];
  }

  React.useEffect(() => {
    if (!date) return;
    async function fetchEventsAndReminders() {
      setLoading(true);
      const formattedDate = formatDate(date);
      try {
        const res = await fetch(`/api/calendarevents?date=${formattedDate}`);
        if (!res.ok) throw new Error("Error fetching data");
        const json = await res.json();
        setEvents(json.events || []);
        setReminders(json.reminders || []);
      } catch (error) {
        console.error(error);
        setEvents([]);
        setReminders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEventsAndReminders();
  }, [date]);

  return (
    <Card className="w-full bg-white/60 backdrop-blur-lg border border-white/30 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardContent className="px-4 py-6 text-center">
        {/* Calendar */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          required={false}
          className="bg-transparent p-0 [--cell-size:--spacing(10.5)]"
        />

        {/* Loading State */}
        {loading && (
          <p className="mt-4 text-gray-500 animate-pulse text-sm">Loading...</p>
        )}

        {/* Data Display */}
        {!loading && (
          <div className="mt-6 bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-5 border border-gray-200/50 overflow-y-auto max-h-62 transition-all duration-300">
            {/* Events Section */}
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              Events
            </h3>
            {events.length === 0 ? (
              <p className="text-gray-500 mt-2 text-sm">No events for this date.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="bg-blue-50/80 rounded-lg p-3 text-left border border-blue-100 hover:bg-blue-100/70 transition-colors"
                  >
                    <p className="font-medium text-blue-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* Reminders Section */}
            <h3 className="text-lg font-semibold text-emerald-700 mt-6 flex items-center gap-2">
              <AlarmClock className="w-5 h-5 text-emerald-500" />
              Reminders
            </h3>
            {reminders.length === 0 ? (
              <p className="text-gray-500 mt-2 text-sm">No reminders for this date.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {reminders.map((reminder) => (
                  <li
                    key={reminder.id}
                    className="bg-emerald-50/80 rounded-lg p-3 text-left border border-emerald-100 hover:bg-emerald-100/70 transition-colors"
                  >
                    <p className="font-medium text-emerald-800">{reminder.title}</p>
                    <p className="text-sm text-gray-600">{reminder.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
