const express = require('express')
const connectDB = require('./config/database')
const User = require("./models/user")
const app = express()

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "John",
        lastName: "Doe",
        emailId: "john.doe@gmail.com",
        password: "john@123",
        age: 28,
        gender: 'Male',
    }
    try {
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

