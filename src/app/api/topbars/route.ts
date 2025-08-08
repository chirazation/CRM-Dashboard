import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const [totalLeads, companyGroup] = await Promise.all([
    prisma.lead.count(), prisma.lead.groupBy({by: ['companyName'],_count: true, }),
  ]);

  return NextResponse.json({
    totalLeads,
    companyCount: companyGroup.length,
  });
}
