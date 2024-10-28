const express = require('express')
const userRouter = express.Router()
const { userAuth } = require("../middlewares/authHandler");
const { ConnectionRequest } = require('../models/connectionRequest');

// GET the request received by logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const conectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "photo_url"])

        res.send({
            message: "Requests fetched successfully",
            data: conectionRequests
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = userRouter