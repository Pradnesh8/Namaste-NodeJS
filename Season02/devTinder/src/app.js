const express = require('express')
const connectDB = require('./config/database')
const app = express()

connectDB().then(() => {
    console.log("Successfully connected to DB")
    app.listen(7777, () => {
        console.log("Running server on port 7777")
    })
}, (err) => {
    console.log("Error while connecting to DB")
})

