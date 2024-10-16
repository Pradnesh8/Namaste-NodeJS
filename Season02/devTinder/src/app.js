const express = require('express')
const connectDB = require('./config/database')
const User = require("./models/user")
const app = express()

// using middleware to parse the JSON payloads
app.use(express.json())

app.post("/signup", async (req, res) => {
    // reads the request body as JS object
    const userObj = req.body
    try {
        // Create a new instance of User model
        const user = new User(userObj);
        await user.save()
        res.send("User added successfully")
    } catch (err) {
        res.status(400).send("Error adding user, err: ", err.message)
    }
})

connectDB().then(() => {
    console.log("Successfully connected to DB")
    app.listen(7777, () => {
        console.log("Running server on port 7777")
    })
}, (err) => {
    console.log("Error while connecting to DB")
})

