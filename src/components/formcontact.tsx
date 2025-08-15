import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateContactData, Contact } from '@/lib/ContactService';

const contactSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().length(8, { message: "Phone must be exactly 8 digits" }),
  notes: z.string().optional(),
  companyName: z.string().min(5, { message: "Company name must be at least 5 characters" }),

});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  initialData?: Contact | null;
  onSubmit: (data: CreateContactData) => Promise<void>;
  isEditing?: boolean;
}

export default function ContactForm({ initialData, onSubmit, isEditing = false }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      notes: "",
    }
  });

  useEffect(() => {
    if (initialData && isEditing) {
      setValue('name', initialData.name);
      setValue('email', initialData.email);
      setValue('phone', initialData.phone);
      setValue('notes', initialData.notes || '');
      setValue('companyName', initialData.companyName);
    }
  }, [initialData, isEditing, setValue]);

  const onSubmitHandler = async (data: ContactFormData) => {
    try {
      const submitData: CreateContactData = {
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
    <div className="max-w-2xl mx-auto p-6  rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditing ? 'Edit Contact' : 'Create New Contact'}
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
            {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Contact" : "Create Contact")}
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
