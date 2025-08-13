import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const now = new Date();
    const activities: {
      type: string;
      action: string;
      item: string;
      createdAt: Date;
    }[] = [];

    // Latest reminder set
    const latestReminder = await prisma.reminder.findFirst({
      orderBy: { createdAt: 'desc' },
      take: 1,
    });
    if (latestReminder) {
      activities.push({
        type: 'reminder_set',
        action: 'Set reminder',
        item: latestReminder.title,
        createdAt: latestReminder.createdAt,
      });
    }

    // Latest event created
    const latestEvent = await prisma.event.findFirst({
      orderBy: { createdAt: 'desc' },
      take: 1,
    });
    if (latestEvent) {
      activities.push({
        type: 'event_created',
        action: 'Created new event',
        item: latestEvent.title,
        createdAt: latestEvent.createdAt,
      });
    }

    // Latest event passed (before today)
    const latestPassedEvent = await prisma.event.findFirst({
      where: { eventDate: { lt: now } },
      orderBy: { eventDate: 'desc' },
      take: 1,
    });
    if (latestPassedEvent) {
      activities.push({
        type: 'event_passed',
        action: 'Event passed',
        item: latestPassedEvent.title,
        createdAt: latestPassedEvent.eventDate,
      });
    }

    // Sort and limit
    const sortedActivities = activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    return NextResponse.json(sortedActivities);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error fetching recent activities:', err.message);
    } else {
      console.error('Unknown error fetching recent activities:', err);
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
