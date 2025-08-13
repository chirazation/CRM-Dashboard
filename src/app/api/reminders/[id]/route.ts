import { NextRequest, NextResponse } from 'next/server';
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
export async function GET( request: NextRequest,
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
      const reminder = await prisma.reminder.findUnique({
        where: { id }
      });

      if (!reminder) {
        return NextResponse.json(
          { error: 'Reminder not found' },
          { status: 404 }
        );
      }
    return NextResponse.json(reminder);
    } catch (error) {
      console.error('Error fetching reminders:', error);
       return NextResponse.json(
      { error: 'Failed to fetch reminder' },
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
    const validatedData = reminderSchema.parse(body);

    const reminder = await prisma.reminder.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(reminder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }

    console.error('Error updating reminder:', error);
    return NextResponse.json(
      { error: 'Failed to update reminder' },
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

    await prisma.reminder.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return NextResponse.json(
      { error: 'Failed to delete reminder' },
      { status: 500 }
    );
  }
}