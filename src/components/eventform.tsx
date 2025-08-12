import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form,FormField,FormItem,FormLabel,FormControl,FormMessage,} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import React , {useState} from 'react';

const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  eventDate: z.date({ message: "Please select an event date" }),
  location: z.string().optional(),
});
type EventFormValues = z.infer<typeof eventSchema>;

export default function EventForm () {
  const form = useForm<EventFormValues>({
     resolver: zodResolver(eventSchema),
     defaultValues: {
       title: '',
       description: '',
       eventDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
       location: '',
     },
   });
  const { handleSubmit, control, reset } = form;
  const [loading, setLoading] = useState(false);
  // AddNewEvent
    const onSubmit = async (data: EventFormValues) => {
      setLoading(true);
      try {
        const localDate = new Date(
        data.eventDate.getFullYear(),
        data.eventDate.getMonth(),
        data.eventDate.getDate(),
        12, 0, 0 
      );
      const event= localDate.toISOString()
      const submissionData = {...data,eventDate: event, };
        const res = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData),
        });
  
        if (!res.ok) throw new Error('Error saving event');
        reset();
  
      } catch (err) {
        console.error('Error saving event', err);
      } finally {
        setLoading(false);
      }
    };
  



  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
           <CalendarDays className="text-gray-600" size={20} />
           <h1 className="text-xl font-medium text-gray-800">New Event</h1>
      </div>

          {/* Title */}
          <FormField
            control={control}
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
            control={control}
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
          control={control}
          name="eventDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Date</FormLabel>
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
          <Button type="submit" disabled={loading} className='bg-[#12284C]'>
          {loading ? 'Saving...' : 'Save Event'}
        </Button>
        </form>
      </Form>
    </div>
  );
}
