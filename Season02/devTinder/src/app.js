const express = require('express')
const app = express()
app.use(
    "/hello", // PATH
    // Request handler
    (req, res) => {
        res.send("Hello from server")
    }
)

app.use(
    "/test", // PATH
    // Request handler
    (req, res) => {
        res.send("Test server")
    }
)
// Always keep / path at the end OR request will be always handled by this handler
app.use(
    "/", // PATH
    // Request handler
    (req, res) => {
        res.send("Welcome to devTinder server")
    }
)
app.listen(7777, () => {
    console.log("Running server on port 7777")
})