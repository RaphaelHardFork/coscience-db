const axios = require("axios")
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
        e.dataError = `The provided value for the column is too long for one of the arguments`
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

exports.register = async (firstName, lastName, email) => {
  try {
    // get the key via Drand.love
    const nb = Math.floor(Math.random() * 100000)
    const response = await axios(`https://drand.cloudflare.com/public/${nb}`)

    // register user info
    const result = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        apiKey: {
          create: {
            key: response.data.randomness,
          },
        },
      },
    })

    // close the connection
    onClose()

    return result.id
  } catch (e) {
    customizeError(e)
    onClose()
    throw e
  }
}

exports.getApiKeyById = async (userId) => {
  try {
    const result = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        apiKey: {
          select: {
            key: true,
          },
        },
      },
    })
    onClose()
    //console.log(result.apiKey.key)
    return result.apiKey.key
  } catch (e) {
    customizeError(e)
    onClose()
    throw e
  }
}

exports.getArticleList = async () => {
  try {
    // query
  } catch (e) {
    console.log(e)
  }
}
