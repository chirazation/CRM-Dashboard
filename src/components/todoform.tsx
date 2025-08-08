import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckSquare } from 'lucide-react';
import {Form,FormField,FormItem,FormLabel,FormControl,FormMessage,} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type ItemType = {
  id: string;
  time: string;
  title: string;
  desc: string;
  color?: string;
  priority?: 'high' | 'medium' | 'low';
};

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  priority: z.enum(['high', 'medium', 'low']),
  dueDate: z.string().optional(),
  estimatedTime: z.string().optional(),
});

type FormValues = z.infer<typeof todoSchema>;

export default function TodoForm({
  item,
  onSave,
  onCancel,
}: {
  item?: ItemType | null;
  onSave: (data: Omit<ItemType, 'id'>) => void;
  onCancel: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: item?.title || '',
      desc: item?.desc || '',
      priority: item?.priority || 'medium',
      dueDate: '',
      estimatedTime: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    const priorityColors = {
      high: 'bg-red-50 border-l-4 border-red-400',
      medium: 'bg-yellow-50 border-l-4 border-yellow-400',
      low: 'bg-gray-50 border-l-4 border-gray-400',
    };

    onSave({
      title: data.title,
      desc: data.desc,
      time: `${data.priority.charAt(0).toUpperCase() + data.priority.slice(1)} Priority`,
      priority: data.priority,
      color: priorityColors[data.priority],
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg ">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
        <CheckSquare size={20} className="text-purple-600" />
        {item ? 'Edit Task' : 'Add New Task'}
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Task title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Task description" rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority Level</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Due Date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Estimated Time */}
          <FormField
            control={form.control}
            name="estimatedTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Time</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., 2 hours" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-[#0a1f44] text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              {item ? 'Update Task' : 'Save Task'}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
