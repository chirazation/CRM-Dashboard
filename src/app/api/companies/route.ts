import { NextResponse } from 'next/server';

import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient(); 
export default prisma;
export async function GET() {
  try {
    const companies = await prisma.company.findMany();
    return NextResponse.json(companies);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, industry, location } = body;

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  try {
    const newCompany = await prisma.company.create({
      data: { name, industry, location },
    });
    return NextResponse.json(newCompany, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
