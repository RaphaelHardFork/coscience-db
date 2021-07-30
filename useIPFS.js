const axios = require("axios")

// do a query on IPFS
const get = async () => {
  try {
    const response = await axios.get(
      "https://gateway.pinata.cloud/ipfs/bafkreihajfhppoj4hvgybz2kccahugzvgiaxzcx3npfg25t7biyuntg6aq"
    )
    console.log(response.data)
  } catch (e) {
    console.log(e)
  }
}

get()
