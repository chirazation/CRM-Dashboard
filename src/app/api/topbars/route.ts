import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const [totalLeads,totalcontacts, companyGroup] = await Promise.all([
    prisma.lead.count(),prisma.contact.count(), prisma.lead.groupBy({by: ['companyName'],_count: true, }),
  ]);

  return NextResponse.json({
    totalLeads,
    totalcontacts,
    companyCount: companyGroup.length,
  });
}
