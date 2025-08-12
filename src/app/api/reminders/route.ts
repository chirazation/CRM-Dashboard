import {NextResponse} from 'next/server';
import { PrismaClient} from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();

const reminderSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  reminderDate: z.date({message: "Please select a reminder date",}),
  note: z.string().optional(),
});
// GET 
export async function GET(): Promise<NextResponse> {
  try {
    const reminders = await prisma.reminder.findMany({
      orderBy: { createdAt: 'desc' }
    });

    console.log('reminders', reminders)

    return NextResponse.json({ reminders });
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reminders' },
      { status: 500 }
    );
  }
}

// POST 
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    if (typeof body.reminderDate === 'string') {
     body.reminderDate = new Date(body.reminderDate);
    }
    const validatedData = reminderSchema.parse(body);
    const { title, description, reminderDate, note } = validatedData;
    const newReminder = await prisma.reminder.create({
      data: {
        title,
        description,
        reminderDate,
        note,
      },
    });

    return NextResponse.json(newReminder, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}