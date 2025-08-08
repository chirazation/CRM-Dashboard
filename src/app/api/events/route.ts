import {NextResponse} from 'next/server';
import { PrismaClient} from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();

const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  eventDate: z.date({message: "Please select an event date",}),
  location: z.string().optional(),
});
// GET 
export async function GET(): Promise<NextResponse> {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST 
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = eventSchema.parse(body);
    const { title, description, eventDate, location } = validatedData;
    const newevent = await prisma.event.create({
      data: {
        title,
        description,
        eventDate,
        location,
      },
    });

    return NextResponse.json(newevent, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}