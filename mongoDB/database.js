const dotenv = require('dotenv')
dotenv.config()
const user = process.env.MONGO_USER
const pass = process.env.MONGO_PASSWORD
const URI = process.env.MONGO_URI
console.log("URI", URI)
module.exports = {
    URI
}