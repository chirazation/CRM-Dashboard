import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LeadStatus } from '@prisma/client';
import { CreateLeadData, Lead } from '@/lib/leadService';

const leadSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().length(8, { message: "Phone must be exactly 8 digits" }),
  status: z.nativeEnum(LeadStatus),
  assignedTo: z.number().int().positive(),
  source: z.string().min(1, { message: "Source is required" }),
  notes: z.string().optional(),
  companyName: z.string().min(5, { message: "Company name must be at least 5 characters" }),
  officePhone: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  initialData?: Lead | null;
  onSubmit: (data: CreateLeadData) => Promise<void>;
  isEditing?: boolean;
}

export default function LeadForm({ initialData, onSubmit, isEditing = false }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      notes: "",
      assignedTo: 1,
      status: LeadStatus.new,
    }
  });

  useEffect(() => {
    if (initialData && isEditing) {
      setValue('name', initialData.name);
      setValue('email', initialData.email);
      setValue('phone', initialData.phone);
      setValue('status', initialData.status);
      setValue('assignedTo', initialData.assignedTo);
      setValue('source', initialData.source);
      setValue('notes', initialData.notes || '');
      setValue('companyName', initialData.companyName);
      setValue('officePhone', initialData.officePhone || '');
    }
  }, [initialData, isEditing, setValue]);

  const selectedStatus = watch("status");

  const onSubmitHandler = async (data: LeadFormData) => {
    try {
      const submitData: CreateLeadData = {
        ...data,
        notes: data.notes || "", 
      };
      
      await onSubmit(submitData);
      if (!isEditing) {
        reset(); 
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditing ? 'Edit Lead' : 'Create New Lead'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
            placeholder="Full Name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <input
            id="phone"
            {...register("phone")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
            placeholder="12345678"
            maxLength={8}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            id="companyName"
            {...register("companyName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
            placeholder="Company Name"
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
          )}
        </div>

        {/* Office Phone */}
        <div>
          <label htmlFor="officePhone" className="block text-sm font-medium text-gray-700 mb-2">
            Office Phone
          </label>
          <input
            id="officePhone"
            {...register("officePhone")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
            placeholder="Office phone (optional)"
          />
        </div>

        {/* Source */}
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
            Source *
          </label>
          <input
  id="source"
  type="text"
  {...register("source")}
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
  placeholder="Source"
/>
          {errors.source && (
            <p className="mt-1 text-sm text-red-600">{errors.source.message}</p>
          )}
        </div>

        {/* Assigned To */}
        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-2">
            Assigned To (User ID) *
          </label>
          <input
            id="assignedTo"
            type="number"
            {...register("assignedTo", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
            placeholder="1"
            min="1"
          />
          {errors.assignedTo && (
            <p className="mt-1 text-sm text-red-600">{errors.assignedTo.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
          >
            <option value="">-- Select a status --</option>
            {Object.values(LeadStatus).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
          {selectedStatus && (
            <p className="mt-1 text-sm text-gray-600">
              Selected status: <span className="font-medium">{selectedStatus}</span>
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
            placeholder="Additional notes about the lead..."
          />
          {errors.notes && (
            <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Lead" : "Create Lead")}
          </button>
          
          <button
            type="button"
            onClick={() => reset()}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
