import { z } from "zod";

export const reminderSchema = z.object({
  leadId: z.number().int({ message: "Lead is required" }),
  reminderDate: z.date({message: "Date is required" }),
  note: z.string().optional(),
});

export type ReminderFormValues = z.infer<typeof reminderSchema>;
