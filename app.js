const express = require("express")
const { register, getApiKeyById } = require("./useDB")

const IP_LOOPBACK = "localhost"
const IP_LOCAL = "172.28.0.1"
const PORT = 3333

const app = express()

// middlewares
const seeApiKey = async (req, res, next) => {
  next()
}

const checkApiKey = async (req, res, next) => {
  next()
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
    console.log(e)
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
  // query in a function
})

app.get("/article/:id", async (req, res) => {
  const id = req.params.id
  // query in a function
})

// listen the server
app.listen(PORT, IP_LOOPBACK, () => {
  console.log(`APP listening at http://${IP_LOOPBACK}:${PORT}/`)
})

obj = {
  firstName: "dodo",
  lastName: "rpito",
  email: "ju@madsdsdsil.com",
}
