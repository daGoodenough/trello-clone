import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "test",
      email: "test@prisma.io",
    },
  });
  console.log(user);
}

main().catch((e) => console.error(e.message));
