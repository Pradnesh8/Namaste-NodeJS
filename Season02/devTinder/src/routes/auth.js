const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const authRouter = express.Router()
const bcrypt = require('bcrypt')

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now())
    })
    res.send("Logged out successfully")
})
module.exports = authRouter;