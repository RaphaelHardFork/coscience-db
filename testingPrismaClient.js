// Here we test the prisma client AND tables we just created
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// Close the connection to the database at the end
const onClose = async () => {
  await prisma.$disconnect()
}

const insert = async () => {
  try {
    const result = await prisma.users.createMany({
      data: [
        {
          firstName: "alice",
          lastName: "zetoun",
          email: "zetouna@mail.com",
        },
        {
          firstName: "bob",
          lastName: "young",
          email: "youngb@mail.com",
        },
        {
          firstName: "charlie",
          lastName: "xoros",
          email: "xorosc@mail.com",
        },
      ],
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

//insert().finally(() => onClose())

const inspect = async () => {
  try {
    const result = await prisma.users.findMany()
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

//inspect().finally(() => onClose())

const insertArticle = async () => {
  try {
    const result = await prisma.articles.createMany({
      data: [
        {
          blockchainId: 1,
          authorId: 1,
          title: "article title uno",
          abstract: "that is the abstract of the article uno",
          contentCID: "Qmfdfdsfdcscefescsecfsedsds",
        },
        {
          blockchainId: 2,
          authorId: 1,
          title: "article title dos",
          abstract: "that is the abstract of the article dos",
          contentCID: "Qmfdfdsfdcfsdfdfscefescsecfsedsds",
        },
        {
          blockchainId: 3,
          authorId: 3,
          title: "article title tres",
          abstract: "that is the abstract of the article tres",
          contentCID: "Qmfdfdsfdcscefdsfsdfsfdfsfsdfescsecfsedsds",
        },
      ],
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

//insertArticle().finally(() => onClose())

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
    console.log(e)
  }
}

//insertWrongArticle().finally(() => onClose())

// See relations in the database
const inspectRealisations = async () => {
  try {
    const result = await prisma.users.findUnique({
      where: {
        id: 5,
      },
      select: {
        firstName: true,
        lastName: true,
        articles: true,
        comments: true,
        reviews: true,
      },
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

inspectRealisations().finally(() => onClose())

const insertCommentAndReview = async () => {
  try {
    const resultComment = await prisma.comments.createMany({
      data: [
        {
          blockchainId: 1,
          authorId: 2,
          title: "Comment by 2 on article 2",
          contentCID: "Qmfdsfddd",
          articleId: 2,
        },
        {
          blockchainId: 2,
          authorId: 3,
          title: "Comment by 3 on article 2",
          contentCID: "Qmfdsfdfdfdddd",
          articleId: 2,
        },
        {
          blockchainId: 3,
          authorId: 2,
          title: "Comment by 2 on article 1",
          contentCID: "Qmfdsfddd",
          articleId: 1,
        },
      ],
    })
    const resultReview = await prisma.reviews.createMany({
      data: [
        {
          blockchainId: 1,
          authorId: 1,
          title: "Review by 1 on article 2",
          contentCID: "Qmfdsfddd",
          articleId: 2,
        },
        {
          blockchainId: 2,
          authorId: 1,
          title: "Review by 1 on article 3",
          contentCID: "Qmfdfdfdsfddd",
          articleId: 3,
        },
        {
          blockchainId: 3,
          authorId: 2,
          title: "Comment by 2 on article 2",
          contentCID: "Qmfdsfddd",
          articleId: 2,
        },
      ],
    })
    console.log(resultComment)
    console.log(resultReview)
  } catch (e) {
    console.log(e)
  }
}

//insertCommentAndReview().finally(() => onClose())

// create user and article
const insertUserAndArticle = async () => {
  try {
    const result = await prisma.users.create({
      data: {
        firstName: "dan",
        lastName: "wick",
        email: "wickd@mail.com",
        articles: {
          create: {
            blockchainId: 5,
            title: "article title cinque",
            abstract: "that is the abstract of the article cinque",
            contentCID: "Qmfdfdsfdcscefdsfsdfsfdfsfsdfescsecfsedsds",
          },
        },
      },
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

//insertUserAndArticle().finally(() => onClose())
