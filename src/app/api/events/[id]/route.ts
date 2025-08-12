import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient} from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();
const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  eventDate: z.date({message: "Please select a reminder date",}),
  location: z.string().optional(),
});
// GET 
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
      if (isNaN(id)) {
         return NextResponse.json(
          { error: 'Invalid ID' },
          { status: 400 }
        );
      }
      const event = await prisma.event.findUnique({
        where: { id }
      });

      if (!event) {
        return NextResponse.json(
          { error: 'Event not found' },
          { status: 404 }
        );
      }
    return NextResponse.json(event);
    } catch (error) {
      console.error('Error fetching events:', error);
       return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );  
    }
}
// PUT 
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) : Promise<NextResponse> {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = eventSchema.parse(body);

    const event = await prisma.event.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }

    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE 
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }
    await prisma.event.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}