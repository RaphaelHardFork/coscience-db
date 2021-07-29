const { PrismaClient, Prisma } = require("@prisma/client")
const prisma = new PrismaClient()

const customizeError = (e) => {
  // test some error UNIQUE, TOO MUCH CHAR, MISSING ARGs(controlled in amont)
}
