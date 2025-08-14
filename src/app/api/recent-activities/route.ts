import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const now = new Date();
    const [latestReminder, latestEvent, latestPassedEvent] = await Promise.all([
      prisma.reminder.findFirst({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.event.findFirst({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.event.findFirst({
        where: {
          eventDate: { lt: now }  
        },
        orderBy: {
          eventDate: 'desc'       
        }
      }),
    ]);

    return NextResponse.json({
      latestReminder,
      latestEvent,
      latestPassedEvent,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
