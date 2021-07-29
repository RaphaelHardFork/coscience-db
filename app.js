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
    if (userId !== "fail") {
      const key = await getApiKeyById(userId)
      if (userId !== "fail") {
        res.json({ status: "success", userId, key })
      }
    }
    console.log("erreur function")
    res.status(400).json({ status: "failed", error: "Something went wrong" })
  } catch (e) {
    console.log(e)
    console.log("erreur catch")
    res.status(400).send(`something went wrong`)
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
