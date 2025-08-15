
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { ZodError } from 'zod';
const prisma = new PrismaClient();

const contactSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().length(8, { message: "Phone must be exactly 8 digits" }),
  notes: z.string().optional(),
  companyName: z.string().min(5, { message: "Company name must be at least 5 characters" }),

});

// GET 
export async function GET(): Promise<NextResponse> {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST 
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const contact = await prisma.contact.create({
      data: validatedData,
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues
        },
        { status: 400 }
      );
    }
    
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}