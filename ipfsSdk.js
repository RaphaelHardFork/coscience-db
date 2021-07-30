require("dotenv").config()

// yarn add @pinata/sdk
const pinataSDK = require("@pinata/sdk")
const pinata = pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET_KEY)

const test = async () => {
  try {
    const result = await pinata.testAuthentication()
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

//test()

const pinJSON = async (JSON) => {
  try {
    const result = await pinata.pinJSONToIPFS(JSON, {
      pinataOptions: {
        cidVersion: 1,
      },
    })
    console.log(result)
    return result.IpfsHash
  } catch (e) {
    console.log(e)
  }
}

const obj = {
  firstName: "bob",
  lastName: "zetoun",
  email: "alice@mail.com",
}

pinJSON(obj)
