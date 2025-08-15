
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient} from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();

const contactSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().length(8, { message: "Phone must be exactly 8 digits" }),
  notes: z.string().optional(),
  companyName: z.string().min(5, { message: "Company name must be at least 5 characters" }),

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
          { error: 'Invalid Contact ID' },
          { status: 400 }
        );
      }

      const contact = await prisma.contact.findUnique({
        where: { id },
      });

      if (!contact) {
        return NextResponse.json(
          { error: 'Contact not found' },
          { status: 404 }
        );
      }

      
    return NextResponse.json(contact);
    } catch (error) {
      console.error('Error fetching contact:', error);
       return NextResponse.json(
      { error: 'Failed to fetch contact' },
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
        { error: 'Invalid contact ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const lead = await prisma.contact.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(lead);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }

    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
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
        { error: 'Invalid contact ID' },
        { status: 400 }
      );
    }

    await prisma.contact.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting ontact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}