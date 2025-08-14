import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [todayreminders, upcomevent ,todayevents] = await Promise.all([
    prisma.reminder.count({
        where :{
          reminderDate: {
           gte: today,   
           lt: tomorrow,  
        },

        }
    }), 
    prisma.event.count({
        where: {
            eventDate: {
             gt: today,   
            }
    }
    }),
        prisma.event.count({
        where: {
            eventDate: {
             gte: today,   
             lt: tomorrow,
            }
    }
    }),

  ]);

  return NextResponse.json({
    todayreminders,
    upcomevent,
    todayevents
  });
}