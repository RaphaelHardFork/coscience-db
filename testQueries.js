const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// close the connection
const onClose = async () => {
  await prisma.$disconnect()
}

const inspect = async () => {
  try {
    const result = await prisma.articles.findMany({
      select: {
        title: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        abstract: true,
        contentCID: true,
        reviews: {
          select: {
            title: true,
            contentCID: true,
            author: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        comments: {
          select: {
            title: true,
            contentCID: true,
            author: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

//inspect().finally(() => process.exit(0))

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

const getUserIdByKey = async (apiKey) => {
  try {
    const result = await prisma.apiKey.findUnique({
      where: {
        key: apiKey,
      },
      select: {
        userId: true,
      },
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

//getUserIdByKey("is it the api key").finally(() => process.exit(0))
const getUser = async () => {
  try {
    const result = await prisma.users.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        wallets: true,
        articles: {
          select: {
            title: true,
          },
        },
        comments: {
          select: {
            title: true,
          },
        },
        reviews: {
          select: {
            title: true,
          },
        },
      },
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

//getUser().finally(() => process.exit(0))

const getCommentsOnArticle = async (articleId) => {
  try {
    const result = await prisma.articles.findMany({
      where: {
        id: articleId,
      },
      select: {
        comments: {
          select: {
            title: true,
            contentCID: true,
            author: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

getCommentsOnArticle(2).finally(() => process.exit(0))
