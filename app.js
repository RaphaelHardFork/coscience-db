const express = require("express")
const {
  register,
  getApiKeyById,
  getArticleList,
  getArticle,
  getUserIdByKey,
  getUser,
  getCommentsOnArticle,
} = require("./useDB")

const IP_LOOPBACK = "localhost"
const IP_LOCAL = "172.28.0.1"
const PORT = 3333

const app = express()

// middlewares
const seeApiKey = async (req, res, next) => {
  const apiKey = req.headers.authorization
  if (!apiKey) {
    res.status(403).json({
      status: "failed",
      message: "There is not authorization in the request.",
    })
    return
  } else {
    req.apiKey = apiKey.replace("Bearer ", "").trim()
  }
  next()
}

const checkApiKey = async (req, res, next) => {
  try {
    const result = await getUserIdByKey(req.apiKey)
    if (!result) {
      res
        .status(403)
        .json({ status: "failed", message: "API KEY is not valid" })
      return
    } else {
      req.userId = result
      next()
    }
  } catch (e) {
    res.status(500).json({ code: "error", message: "Internal server error" })
  }
}

// read JSON from queries
app.use(express.urlencoded({ extended: false })) // to support URL-encoded bodies
app.use(express.json()) // to support JSON-encoded bodies

app.post("/register", async (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  try {
    const userId = await register(firstName, lastName, email)
    const key = await getApiKeyById(userId)
    res.json({ status: "success", userId, key })
  } catch (e) {
    if (e.status === "failed") {
      res.status(400).json({ status: "failed", message: e.dataError })
    } else if (e.status === "error") {
      res
        .status(400)
        .json({ status: "error", message: "Unknown error with the client" })
    } else {
      res
        .status(500)
        .json({ status: "error", message: "error with the server" })
    }
  }
})

app.get("/article", async (req, res) => {
  try {
    const result = await getArticleList()
    res.json({ status: "success", data: result })
  } catch (e) {
    if (e.status === "failed") {
      res.status(400).json({ status: "failed", message: e.dataError })
    } else if (e.status === "error") {
      res
        .status(400)
        .json({ status: "error", message: "Unknown error with the client" })
    } else {
      console.log("end of route article")
      res
        .status(500)
        .json({ status: "error", message: "error with the server" })
    }
  }
})

app.get("/article/:id", async (req, res) => {
  let articleId = req.params.id
  if (isNaN(Number(articleId))) {
    res.status(400).json({
      status: "failed",
      message: `${req.params.id} is not a correct ID`,
    })
    return
  } else {
    articleId = Number(articleId)
  }
  try {
    const result = await getArticle(articleId)
    res.json({ status: "success", data: result })
    return
  } catch (e) {
    if (e.status === "failed") {
      console.log("ERREUR")
      res.status(400).send("erreur")
    } else if (e.status === "error") {
      res
        .status(400)
        .json({ status: "error", message: "Unknown error with the client" })
    } else {
      console.log("end of route article")
      res
        .status(500)
        .json({ status: "error", message: "error with the server" })
    }
  }
})

app.get("/user", async (req, res) => {
  try {
    const result = await getUser()
    res.json({ status: "success", data: result })
  } catch (e) {
    if (e.status === "failed") {
      res.status(400).json({ status: "failed", message: e.dataError })
    } else if (e.status === "error") {
      res
        .status(400)
        .json({ status: "error", message: "Unknown error with the client" })
    } else {
      console.log("end of route article")
      res
        .status(500)
        .json({ status: "error", message: "error with the server" })
    }
  }
})

app.get("/user/:id", async (req, res) => {
  const id = req.params.id
  // query in a function
})

app.get("/comments/:article_id", async (req, res) => {
  let article_id
  if (isNaN(Number(req.params.article_id))) {
    res.status(400).json({
      status: "failed",
      message: `${req.params.article_id} is not a correct ID`,
    })
    return
  } else {
    article_id = Number(req.params.article_id)
  }
  try {
    const result = await getCommentsOnArticle(article_id)
    res.json({ status: "success", data: result })
  } catch (e) {
    if (e.status === "failed") {
      res.status(400).json({ status: "failed", message: e.dataError })
    } else if (e.status === "error") {
      res
        .status(400)
        .json({ status: "error", message: "Unknown error with the client" })
    } else {
      console.log("end of route article")
      res
        .status(500)
        .json({ status: "error", message: "error with the server" })
    }
  }
})

app.get("/reviews/:article_id", async (req, res) => {
  const id = req.params.id
  // query in a function
})

app.get("/comments/:user_id", async (req, res) => {
  const id = req.params.id
  // query in a function
})

app.get("/reviews/:user_id", async (req, res) => {
  const id = req.params.id
  // query in a function
})

app.get("/wallets/:user_id", async (req, res) => {
  const id = req.params.id
  // query in a function
})

app.get("/user/:wallet", async (req, res) => {
  const id = req.params.id
  // query in a function
})

// authorization needed for the following route
app.use(seeApiKey)
app.use(checkApiKey)

app.post("/add_wallet", async (req, res) => {
  res.json({ key: req.headers.authorization })
})

app.post("/update_bio", async (req, res) => {
  // add bio & socials in the DB
})

// listen the server
app.listen(PORT, IP_LOOPBACK, () => {
  console.log(`APP listening at http://${IP_LOOPBACK}:${PORT}/`)
})
