const { PrismaClient, Prisma } = require("@prisma/client")
const prisma = new PrismaClient()

// Close the connection to the database at the end
const onClose = async () => {
  await prisma.$disconnect()
}

const customizeError = (e) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    e.status = "failed"
    e.dataError = {}
    switch (e.code) {
      case "P2002":
        e.dataError[e.meta.target[0]] = `${e.meta.target[0]} already exists`
        break
      case "P2000":
        // error is not well defined: can't access to the target
        e.dataError = `The provided value for the column is too long for one of argument`
        break
      default:
        e.dataError = e.message
    }
  } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    e.status = "failed"
    if (!e.dataError) {
      e[dataError] = "Unknown error"
    } else {
      e.dataError = "Unknown error"
    }
  } else if (e instanceof Prisma.PrismaClientValidationError) {
    e["dataError"] = `One of the input is missing or is in the wrong type`
    e["code"] = "WRONG_ARGS"
    e["status"] = "failed"
  } else {
    e.status = "error"
  }
  throw e
}

const insertWrongArticle = async () => {
  try {
    const result = await prisma.articles.create({
      data: {
        authorId: 2,
        blockchainId: "r",
        title:
          "article title quatrosaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        abstract: "that is the abstract of the article quatros",
        contentCID: "Qmfdfdsfdcscefdsfsdfaaaaaescsecfsedsds",
      },
    })
    console.log(result)
  } catch (e) {
    customizeError(e)
  }
}

insertWrongArticle().finally(() => onClose())
