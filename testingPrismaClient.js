// Here we test the prisma client AND tables we just created
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const insert = async () => {
  const result = await prisma.users.createMany({
    data: [{}],
  })
}
