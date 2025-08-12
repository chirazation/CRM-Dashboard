'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useState } from 'react';
import {Bell} from 'lucide-react';
const reminderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string({message: "Description is required"}),
  reminderDate: z.date({message: "Please select a reminder date"}),
  note: z.string().optional(),
});

type ReminderFormData = z.infer<typeof reminderSchema>;

export default function ReminderForm() {
  const form = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      title: '',
      description: '',
      reminderDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      note: '',
    },
  });

  const { handleSubmit, control, reset } = form;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ReminderFormData) => {
    setLoading(true);
    try {
      const localDate = new Date(
        data.reminderDate.getFullYear(),
        data.reminderDate.getMonth(),
        data.reminderDate.getDate(),
        12, 0, 0 
      );
      const reminder = localDate.toISOString()
      console.log("reminder", reminder)
      const submissionData = {
        ...data,
        reminderDate: reminder, 
      };

      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) throw new Error('Error saving reminder');
      reset();

    } catch (err) {
      console.error('Error saving reminder', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-gray-600" size={20} />
        <h1 className="text-xl font-medium text-gray-800">New reminder</h1>
      </div>
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
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
        <FormField
          control={control}
          name="note"
          render={({ field }) => (
          <FormItem>
            <FormLabel>Note</FormLabel>
          <FormControl>
           <Textarea {...field} />
          </FormControl>
         <FormMessage />
         </FormItem>
        )}
         />
        
        <Button type="submit" disabled={loading} className='bg-[#12284C]'>
          {loading ? 'Saving...' : 'Save Reminder'}
        </Button>
      </form>
    </Form>
    </div>
  );
}
