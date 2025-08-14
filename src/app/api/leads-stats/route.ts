import { prisma } from "@/lib/prisma"; // Adjust path to your Prisma client
import { NextResponse } from "next/server";

export async function GET() {
  const leads = await prisma.lead.findMany({
    select: {
      status: true,
      createdAt: true,
    },
  });

  const months = [
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ];

  const result = months.map((month) => {
    const desktopCount = leads.filter(
      (lead) =>
        lead.status === "new" &&
        lead.createdAt.toLocaleString("en-US", { month: "long" }) === month
    ).length;

    const mobileCount = leads.filter(
      (lead) =>
        lead.status === "qualified" &&
        new Date(lead.createdAt).toLocaleString("en-US", { month: "long" }) === month
    ).length;

    return { month, desktop: desktopCount, mobile: mobileCount };
  });

  const totalStart = result[0].desktop + result[0].mobile;
  const totalEnd = result[result.length - 1].desktop + result[result.length - 1].mobile;
  const trend = totalStart === 0 ? 0 : ((totalEnd - totalStart) / totalStart) * 100;

  return NextResponse.json({ months: result, trend });
}
