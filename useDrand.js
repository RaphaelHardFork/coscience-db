// https://drand.love/developer/http-api/#public-endpoints

const axios = require("axios")

const getApiKey = async (nb) => {
  try {
    const response = await axios.get(
      `https://drand.cloudflare.com/public/${nb}`
    )
    console.log(response.data.randomness)
  } catch (e) {
    console.log(e)
  }
}

getApiKey(2)
