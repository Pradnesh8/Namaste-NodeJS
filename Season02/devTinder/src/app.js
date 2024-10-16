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

// GET user by emailId
app.get("/user", async (req, res) => {
    try {
        const email = req.body.emailId;
        const user = await User.findOne({ emailId: email });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user)
        }
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})
// GET user by _id
app.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user)
        }
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

// GET /feed - all the users from users collection
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        res.status(400).send("Something went wrong")
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

