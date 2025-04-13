const express = require('express')
const { userAuth } = require('../middlewares/authHandler')
const { ConnectionRequest } = require('../models/connectionRequest')
const User = require('../models/user')
const requestRouter = express.Router()
const sendEmail = require("../utils/sendEmail");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status
        // Added validation in pre middleware at schema level
        // if (fromUserId == toUserId) {
        //     return res.status(400).json({
        //         message: "Invalid Connection Request, Can't send connection to yourself."
        //     })
        // }

        const allowedStatus = ['ignored', 'interested'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid Connection Request Status type : " + status
            })
        }

        const checkIfToUserExists = await User.findById(toUserId)
        if (!checkIfToUserExists) {
            return res.status(404).json({
                message: "User which you are trying to send connection request, does not exists!"
            })
        }
        // To check if connection request from fromUserId to toUSerId or toUserId to fromUserId already exists
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {
                    fromUserId, toUserId
                },
                {
                    fromUserId: toUserId, toUserId: fromUserId
                },
            ]
        })
        if (existingConnectionRequest) {
            return res.status(400).json({
                message: 'Connection Request Already Exists'
            })
        }
        const sendConnectionRequest = await ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const savedConnectionRequestData = await sendConnectionRequest.save()
        try {
            await sendEmail.run();
        } catch (error) {
            console.error("Error sending an Email: ", error)
        }
        res.json({ message: "Connection sent successfully!", data: savedConnectionRequestData })
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        // requestId is fromUserId (from which user, logged in user have got the request)
        const { status, requestId } = req.params

        // validate the allowedStatus
        const allowedStatus = ['accepted', 'rejected'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid Connection Request Status type : " + status
            })
        }

        // validate requestId
        const fromUser = await User.findById(requestId);
        if (!fromUser) {
            return res.status(404).json({
                message: "Invalid Request id"
            })
        }

        // check if connection request with interested status is present for fromUserId and toUserId
        const connectionRequest = await ConnectionRequest.findOne({
            fromUserId: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })
        if (!connectionRequest) {
            return res.status(404).json({
                message: "Connection request not found"
            })
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({
            message: "Connection request is " + status,
            data
        })
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = requestRouter