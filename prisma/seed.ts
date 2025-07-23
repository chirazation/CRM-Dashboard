import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@example.com",
    password: "12345"
  },
  {
    name: "Bob",
    email: "bob@example.com",
    password: "1234"
  },
];

async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main()
  .then(() => {
    console.log("✅ Seeding completed.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    return prisma.$disconnect();
  });
