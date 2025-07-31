'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { useState } from 'react';

const reminderSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  reminderDate: z.date({message: "Please select a reminder date",}),
  note: z.string().optional(),
});

type ReminderFormValues = z.infer<typeof reminderSchema>;

export function ReminderForm() {
  const [status, setStatus] = useState('');
  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      title: "",
      description: "",
      reminderDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      note: "",
    },
  });
  
  const handleSubmitForm = async (data: ReminderFormValues) => {
    try {
      // Create a new date object in local timezone to avoid UTC conversion issues
      const localDate = new Date(
        data.reminderDate.getFullYear(),
        data.reminderDate.getMonth(),
        data.reminderDate.getDate(),
        12, 0, 0 // Set to noon to avoid any timezone edge cases
      );

      const reminder = localDate.toISOString()

      console.log("reminder", reminder)
      const submissionData = {
        ...data,
        reminderDate: reminder, // Send as ISO string
      };

      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus("Thank you! Reminder saved.");
      form.reset();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("There was an error. Please try again.");
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative max-h-[90vh] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            New reminder!
          </h2>

          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter reminder title..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter reminder description..." rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reminder Date */}
          <FormField
            control={form.control}
            name="reminderDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reminder Date</FormLabel>
                <FormControl>
                   <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) {
                        // Create date at local midnight to avoid timezone issues
                        const localDate = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate()
                        );
                        field.onChange(localDate);
                      }
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      return date < todayStart;
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes Field */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Optional additional notes..." rows={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-[#12284C] text-white">
            Save Reminder
          </Button>

          {status && <p className="text-sm text-center text-gray-600 mt-2">{status}</p>}
        </form>
      </Form>
    </div>
  );
}
