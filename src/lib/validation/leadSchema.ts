import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  status: z.enum(['New', 'Contacted', 'Qualified']),
  assignedTo: z.preprocess(
  (val) => (typeof val === 'string' ? Number(val) : val),
  z.number({ message: 'AssignedTo must be a number' }),
  ),
  source: z.string().optional(),
  companyId: z.preprocess(
    (val) => {
      if (typeof val === 'string' && val !== '') return Number(val);
      return undefined;
    },
    z.number().optional()
  ),
  notes: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
