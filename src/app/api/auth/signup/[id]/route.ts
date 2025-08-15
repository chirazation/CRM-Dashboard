
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient} from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();

const userSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email" }),
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
          { error: 'Invalid user ID' },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Contact not found' },
          { status: 404 }
        );
      }

      
    return NextResponse.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
       return NextResponse.json(
      { error: 'Failed to fetch user' },
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
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = userSchema.parse(body);

    const user = await prisma.user.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }

    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
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
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}