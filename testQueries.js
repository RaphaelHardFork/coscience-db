const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// close the connection
const onClose = async () => {
  await prisma.$disconnect()
}

const inspect = async () => {
  try {
    const result = await prisma.users.findUnique({
      where: {
        id: 38,
      },
      select: {
        firstName: true,
        lastName: true,
        id: true,
        apiKey: {
          select: {
            key: true,
          },
        },
      },
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

inspect().finally(() => onClose())

const insert = async () => {
  try {
    const result = await prisma.users.create({
      data: {
        firstName: "alison",
        lastName: "RRR",
        email: "AS@mailgfgjhjhftrr.com",
        apiKey: {
          create: {
            key: "the api key",
          },
        },
      },
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

//insert().finally(() => onClose())
