const express = require('express')
const userRouter = express.Router()
const { userAuth } = require("../middlewares/authHandler");
const { ConnectionRequest } = require('../models/connectionRequest');
const User = require('../models/user');


const SAFE_USER_FIELDS = ["firstName", "lastName", "photo_url", "skill", "about", "age", "gender"]
// GET the request received by logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const conectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", SAFE_USER_FIELDS)

        res.send({
            message: "Requests fetched successfully",
            data: conectionRequests
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

// GET the accepted connections sent or received by logged in user
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" },
            ]
        })
            .populate("fromUserId", SAFE_USER_FIELDS)
            .populate("toUserId", SAFE_USER_FIELDS)

        // console.log("CONNREQ", connectionRequests)
        const data = connectionRequests.map(conn => {
            if (conn.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return conn.toUserId
            }
            return conn.fromUserId
        })

        res.json({
            data
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

// GET Feed
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        // Show all the users from DB except
        // 0. logged in user profile
        // 1. users from which logged in user request/received connection
        // 2. users which are already connections

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        const hideUserProfiles = new Set()
        connectionRequests.forEach(request => {
            hideUserProfiles.add(request.fromUserId)
            hideUserProfiles.add(request.toUserId)
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserProfiles) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(SAFE_USER_FIELDS.join(" "))

        res.send(users)
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = userRouter