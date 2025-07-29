
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, LeadStatus } from '@prisma/client';
import { z } from 'zod';
import { ZodError } from 'zod';
const prisma = new PrismaClient();

// Schema de validation pour créer/modifier un lead
const leadSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().length(8, { message: "Phone must be exactly 8 digits" }),
  status: z.nativeEnum(LeadStatus),
  assignedTo: z.number().int().positive(),
  source: z.string().min(1, { message: "Source is required" }),
  notes: z.string().optional(),
  companyName: z.string().min(5, { message: "Company name must be at least 5 characters" }),
  officePhone: z.string(),
});

// GET 
export async function GET(): Promise<NextResponse> {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau lead
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: validatedData,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    return NextResponse.json(lead, { status: 201 });
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
    
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}