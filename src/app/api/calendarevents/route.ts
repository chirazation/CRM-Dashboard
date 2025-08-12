import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
  const dateString = searchParams.get('date'); 
  if (!dateString) {
    return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
  }
  const date = new Date(dateString);
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  const [events, reminders] = await Promise.all([
    prisma.event.findMany({
      where: {
        eventDate: { 
          gte: startOfDay,
          lte: endOfDay,
        }
      }
    }),
    prisma.reminder.findMany({
      where: {
        reminderDate: { 
          gte: startOfDay,
          lte: endOfDay,
        }
      }
    })
  ]);
  return NextResponse.json({ events, reminders });
}
