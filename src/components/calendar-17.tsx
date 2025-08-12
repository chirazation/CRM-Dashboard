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
    <Card className="w-fit py-4">
      <CardContent className="px-4 justify-center text-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          required={false}
          className="bg-transparent p-0 [--cell-size:--spacing(10.5)]"
        />
        {loading && <p>Loading...</p>}

{loading && (
  <p className="text-center text-gray-500 animate-pulse">Loading...</p>
)}

{!loading && (
  <div className="mt-6 max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200 overflow-y-auto max-h-58">
    {/* Events Section */}
    <h3 className="text-lg font-semibold text-[#12284c] flex items-center gap-2">
      <CalendarDays className="w-5 h-5 text-[#12284c]" />
      Events
    </h3>
    {events.length === 0 ? (
      <p className="text-gray-500 mt-2">No events for this date.</p>
    ) : (
      <ul className="mt-3 space-y-2">
        {events.map((event) => (
          <li key={event.id} >
            <p className="font-medium text-[#12284c]">{event.title}</p>
            <p className="text-sm text-gray-600">{event.description}</p>
          </li>
        ))}
      </ul>
    )}

    {/* Reminders Section */}
    <h3 className="text-lg font-semibold text-emerald-600 mt-6 flex items-center gap-2">
      <AlarmClock className="w-5 h-5 text-emerald-500" />
      Reminders
    </h3>
    {reminders.length === 0 ? (
      <p className="text-gray-500 mt-2">No reminders for this date.</p>
    ) : (
      <ul className="mt-3 space-y-2">
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            <p className=" text-emerald-800">{reminder.title}</p>
            <p className=" text-gray-600">{reminder.description}</p>
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
