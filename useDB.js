const axios = require("axios")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// Close the connection to the database at the end
const onClose = async () => {
  await prisma.$disconnect()
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
    console.log(e)
    onClose()
    return "fail"
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
    console.log(e) // manage error with PRISMA
    onClose()
    return "fail"
  }
}

exports.getArticleList = async () => {
  try {
    // query
  } catch (e) {
    console.log(e)
  }
}
