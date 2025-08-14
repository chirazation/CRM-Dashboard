'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useState, useEffect } from 'react';
import { Bell, Pencil } from 'lucide-react';

const reminderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string({message: "Description is required"}),
  reminderDate: z.date({ message: "Please select an event date" }),
  note: z.string().optional(),
});

type ReminderFormData = z.infer<typeof reminderSchema>;

interface ReminderFormProps {
  editMode?: boolean;
  editData?: {
    id: string;
    title: string;
    description: string;
    date: Date;
    note?: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ReminderForm({ 
  editMode = false, 
  editData, 
  onSuccess, 
  onCancel 
}: ReminderFormProps) {
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

 
  useEffect(() => {
    if (editMode && editData) {
      reset({
        title: editData.title,
        description: editData.description,
        reminderDate: editData.date,
        note: editData.note || '',
      });
    }
  }, [editMode, editData, reset]);

  const onSubmit = async (data: ReminderFormData) => {
    setLoading(true);
    try {
      const localDate = new Date(
        data.reminderDate.getFullYear(),
        data.reminderDate.getMonth(),
        data.reminderDate.getDate(),
        12, 0, 0 
      );
      const submissionData = {...data,reminderDate : localDate, };
      const url = editMode ? `/api/reminders/${editData?.id}` : '/api/reminders';
      const method = editMode ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.log('Error response:', errorText);
        throw new Error(`Error ${editMode ? 'updating' : 'saving'} reminder: ${res.status} - ${errorText}`);
      }
      if (!editMode) {
        reset();
      }
      
      onSuccess?.();

    } catch (err) {
      console.error(`Error ${editMode ? 'updating' : 'saving'} reminder`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            {editMode ? (
              <Pencil className="text-gray-600" size={20} />
            ) : (
              <Bell className="text-gray-600" size={20} />
            )}
            <h1 className="text-xl font-medium text-gray-800">
              {editMode ? 'Edit reminder' : 'New reminder'}
            </h1>
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
                          )
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
          
          <div className="flex gap-3">
            {editMode && onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={loading} 
              className={`bg-[#12284C] ${editMode ? 'flex-1' : ''}`}
            >
              {loading 
                ? (editMode ? 'Updating...' : 'Saving...') 
                : (editMode ? 'Update Reminder' : 'Save Reminder')
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}