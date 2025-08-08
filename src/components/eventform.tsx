import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form,FormField,FormItem,FormLabel,FormControl,FormMessage,} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import React from 'react';

type ItemType = {
  id: string;
  time: string;
  title: string;
  desc: string;
  color?: string;
};

const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  eventDate: z.date({ message: "Please select a reminder date" }),
  location: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function EventForm({
  item,
  onSave,
  onCancel,
}: {
  item?: ItemType | null;
  onSave: (data: Omit<ItemType, 'id'>) => void;
  onCancel: () => void;
}) {
  const defaultDate = item?.time ? new Date(item.time) : new Date();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: item?.title || '',
      description: item?.desc || '',
      eventDate: defaultDate,
      location: '',
    },
  });

  const handleSubmit = (data: EventFormValues) => {
    onSave({
      title: data.title,
      desc: data.description,
      time: data.eventDate.toISOString(),
      color: 'bg-blue-50 border-l-4 border-blue-400',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center flex items-center gap-2">
            <CalendarDays className="text-gray-600" size={20} />
            {item ? 'Edit event' : 'New event'}
          </h2>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Event title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Event description..." rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

          {/* Date */}
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Calendar mode="single" selected={field.value} onSelect={(date) => date && field.onChange(date)}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Optional location..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1 bg-[#12284C] text-white">{item ? 'Update Event' : 'Save Event'}</Button>
            <Button type="button" onClick={onCancel} variant="outline" className="flex-1">Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
