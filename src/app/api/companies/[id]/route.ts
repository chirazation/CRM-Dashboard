import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params} : { params: Promise<{id : number }>}) {
  const { id } = await params;
  const body = await request.json();
  const { name, industry, location } = body;

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  try {
    const updatedCompany = await prisma.company.update({
      where: { id },
      data: { name, industry, location },
    });
    return NextResponse.json(updatedCompany);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params} : { params: Promise<{id : number }>}
) {
  const { id } = await params;

  try {
    await prisma.company.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
