const express = require("express")
const get = express.Router()

const { getReviewsOnArticle } = require("./useDB")

get.get("/reviews/:article_id", async (req, res) => {
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
    const result = await getReviewsOnArticle(article_id)
    res.json({ status: "success", data: result })
  } catch (e) {
    // catchError(e) => create the function
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

module.exports = { get }
