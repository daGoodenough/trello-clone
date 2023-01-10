import { PrismaClient } from "@prisma/client";
// import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.comment.create({
    data: {
      user: {
        connect: {
          id: "9067e6c1-3cad-4b91-8abb-bf8ed018e329",
        },
      },
      text: "Very Cool !",
      Card: {
        connect: {
          id: "689bc2b3-47d7-4f1c-956f-53f85dc4e034",
        },
      },
    },
  });
  console.log(user);
}

main().catch((e) => console.error(e.message));
