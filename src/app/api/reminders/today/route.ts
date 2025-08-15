import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ton instance Prisma

export async function GET() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const count = await prisma.reminder.count({
    where: {
      reminderDate: {
        gte: today,
        lt: tomorrow
      }
    }
  });

  return NextResponse.json({ count });
}
