const express = require('express')
const connectDB = require('./config/database')
const User = require("./models/user")
const app = express()
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { userAuth } = require('./middlewares/authHandler')
dotenv.config()
// using middleware to parse the JSON payloads
app.use(express.json())
app.use(cookieParser())

app.post("/signup", async (req, res) => {
    try {
        // validate the data
        validateSignUpData(req)
        const { firstName, lastName, emailId, password } = req.body;
        // encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        // save the user
        // Create a new instance of User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save()
        res.send("User added successfully")
    } catch (err) {
        res.status(400).send("Error signing up the user, err: " + err.message)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("EmailId or Password is not correct")
        }
        // using userSchema.method to compare passwords
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new Error("EmailId or Password is not correct")
        } else {
            // using userSchema.method to get Jwt
            const jwtToken = await user.getJWT()
            res.cookie('token', jwtToken, { expires: new Date(Date.now() + 900000) })
            res.send("Login Successful!")
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        res.send("Connection sent successfully!")
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
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

