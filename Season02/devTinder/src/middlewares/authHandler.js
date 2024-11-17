const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const User = require('../models/user');
dotenv.config()
// userAuth middleware
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            // throw new Error("Invalid token")
            return res.status(401).send("User is not logged in")
        }
        const decryptedData = await jwt.verify(token, process.env.SECRET_KEY);
        const { _id } = decryptedData;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User does not exist, Please sign up!")
        }
        // making copy of user data - was not keeping it instance of user model if i create a copy
        // const resObj = { ...user._doc }
        // removing password field from user data
        // delete resObj.password
        req.user = user;
        next()
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
}

module.exports = {
    userAuth
}