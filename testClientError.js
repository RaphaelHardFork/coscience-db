const { PrismaClient, Prisma } = require("@prisma/client")
const prisma = new PrismaClient()

// Close the connection to the database at the end
const onClose = async () => {
  await prisma.$disconnect()
}

const customizeError = (e) => {
  // test some error UNIQUE, TOO MUCH CHAR, MISSING ARGs(controlled in amont)
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    e.status = "fail"
    e.dataError = {}
    console.log(e.code)
    switch (e.code) {
      case "P2002":
        console.log("case P2002")
        e.dataError[e.meta.target[0]] = `${e.meta.target[0]} already exists`
        break
      default:
        console.log("default")
        e.dataError[e.meta.target[0]] = e.message
    }
  } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    console.log(e.code)
  } else if (e instanceof Prisma.PrismaClientValidationError) {
    // tell error
  } else {
    console.log("not instance")
    e.status = "error"
  }
  throw e
}

const insertWrongArticle = async () => {
  try {
    const result = await prisma.articles.create({
      data: {
        authorId: 2,
        title: "article title quatros",
        abstract: "that is the abstract of the article quatros",
        contentCID: "Qmfdfdsfdcscefdsfsdfsfdfsfsddfddfescsecfsedsds",
      },
    })
    console.log(result)
  } catch (e) {
    customizeError(e)
  }
}

insertWrongArticle().finally(() => onClose())
