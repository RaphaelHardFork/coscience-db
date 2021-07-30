const axios = require("axios")
const { PrismaClient, Prisma } = require("@prisma/client")
const prisma = new PrismaClient()

// Close the connection to the database at the end
/*
This function is not necessary now, maybe in production

const onClose = async () => {
  await prisma.$disconnect()
}
*/

// Add informations to errors
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
      e["dataError"] = "Unknown error"
    } else {
      e.dataError = "Unknown error"
    }
  } else if (e instanceof Prisma.PrismaClientValidationError) {
    e["dataError"] = `One of the input is missing or is in the wrong type`
    e["code"] = "WRONG_ARGS"
    e["status"] = "failed"
  } else if (e instanceof Prisma.PrismaClientInitializationError) {
    e[
      "dataError"
    ] = `Please make sure your database server is running at localhost:5432`
    e["status"] = "failed"
  } else {
    e.status = "error"
  }
  throw e
}

// register into the database
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

    return result.id
  } catch (e) {
    customizeError(e)
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
    return result.apiKey.key
  } catch (e) {
    customizeError(e)
    throw e
  }
}

// getter
exports.getUserIdByKey = async (apiKey) => {
  try {
    const result = await prisma.apiKey.findUnique({
      where: {
        key: apiKey,
      },
      select: {
        userId: true,
      },
    })
    return result
  } catch (e) {
    customizeError(e)
    throw e
  }
}

exports.getUser = async () => {
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
    return result
  } catch (e) {
    customizeError(e)
    throw e
  }
}

exports.getArticleList = async () => {
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

    return result
  } catch (e) {
    customizeError(e)
    throw e
  }
}

exports.getArticle = async (articleId) => {
  try {
    const result = await prisma.articles.findUnique({
      where: {
        id: articleId,
      },
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

    return result
  } catch (e) {
    customizeError(e)
    throw e
  }
}

exports.getCommentsOnArticle = async (articleId) => {
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
    return result
  } catch (e) {
    customizeError(e)
    throw e
  }
}

exports.getReviewsOnArticle = async (articleId) => {
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
    return result
  } catch (e) {
    customizeError(e)
    throw e
  }
}

exports.getUserByWallet = async (wallet) => {
  try {
    // query
  } catch (e) {
    console.log(e)
  }
}
