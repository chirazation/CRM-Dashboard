// app/api/leads/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, LeadStatus } from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();

const leadSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().length(8, { message: "Phone must be exactly 8 digits" }),
  status: z.nativeEnum(LeadStatus),
  assignedTo: z.number().int().positive(),
  source: z.string().min(1, { message: "Source is required" }),
  notes: z.string().optional(),
  companyName: z.string().min(5, { message: "Company name must be at least 5 characters" }),
  officePhone: z.string().optional(),
});
// GET - Récupérer un lead spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
      const { id: idParam } = await params;
    const id = parseInt(idParam);
      
      if (isNaN(id)) {
         return NextResponse.json(
          { error: 'Invalid lead ID' },
          { status: 400 }
        );
      }

      const lead = await prisma.lead.findUnique({
        where: { id },
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      });

      if (!lead) {
        return NextResponse.json(
          { error: 'Lead not found' },
          { status: 404 }
        );
      }

      
    return NextResponse.json(lead);
    } catch (error) {
      console.error('Error fetching lead:', error);
       return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    );  
    }
}
// PUT - Mettre à jour un lead
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) : Promise<NextResponse> {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid lead ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    const lead = await prisma.lead.update({
      where: { id },
      data: validatedData,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    return NextResponse.json(lead);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }

    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid lead ID' },
        { status: 400 }
      );
    }

    await prisma.lead.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}