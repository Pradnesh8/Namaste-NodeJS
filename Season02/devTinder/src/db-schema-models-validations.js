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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("EmailId or Password is not correct")
        } else {
            const jwtToken = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
            res.cookie('token', jwtToken)
            res.send("Login Successful!")
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
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

// DELETE /user - Delete user from collection
app.delete("/user", async (req, res) => {
    try {
        const id = req.body.id;
        const user = await User.findByIdAndDelete(id);
        // console.log("deleted", user)
        // same as const users = await User.findByIdAndDelete({_id:id});
        if (!user) {
            res.status(404).send("User not found")
        } else {
            res.send("User deleted successfully")
        }
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

// UPDATE /user - Update user by id
app.patch("/user/:userId", async (req, res) => {
    try {
        const ALLOWED_UPDATES = ["age", "skill", "about", "photo_url"]
        const id = req.params.userId;
        const data = req.body
        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update is not allowed")
        }
        if (data?.skill && data?.skill.length > 10) {
            throw new Error("Cannot add more than 10 skills")
        }
        const user = await User.findByIdAndUpdate(id, data, { runValidators: true });
        // console.log("updated", user)
        // same as const users = await User.findByIdAndDelete({_id:id});
        if (!user) {
            res.status(404).send("User not found")
        } else {
            res.send("User updated successfully")
        }
    } catch (error) {
        res.status(400).send("ERROR UPDATING USER : " + error.message)
    }
})

// UPDATE /user - Update user by emailId
app.patch("/user", async (req, res) => {
    try {
        const email = req.body.emailId;
        const data = req.body
        const user = await User.findOneAndUpdate({ emailId: email }, data, { runValidators: true });
        // console.log("updated", user)
        // same as const users = await User.findByIdAndDelete({_id:id});
        if (!user) {
            res.status(404).send("User not found")
        } else {
            res.send("User updated successfully")
        }
    } catch (error) {
        res.status(400).send("Something went wrong")
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

