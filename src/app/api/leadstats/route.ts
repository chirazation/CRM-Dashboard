import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function GET() {
  const [newCount, contactedCount, convertedCount , qualifiedCount] = await Promise.all([
    prisma.lead.count({ where: { status: 'new' } }),
    prisma.lead.count({ where: { status: 'contacted' } }),
    prisma.lead.count({ where: { status: 'converted' } }),
    prisma.lead.count({ where: { status: 'qualified' } }),
  ]);

  return NextResponse.json({
    new: newCount,
    contacted: contactedCount,
    converted: convertedCount,
    qualified: qualifiedCount,
  });
}
