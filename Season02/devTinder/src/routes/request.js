const express = require('express')
const { userAuth } = require('../middlewares/authHandler')
const { ConnectionRequest } = require('../models/connectionRequest')
const User = require('../models/user')
const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        if (fromUserId == toUserId) {
            return res.status(400).json({
                message: "Invalid Connection Request, Can't send connection to yourself."
            })
        }

        const allowedStatus = ['ignored', 'interested'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid Connection Request Status type : " + status
            })
        }

        const checkIfUserExists = await User.findById(toUserId)
        if (!checkIfUserExists) {
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
        res.json({ message: "Connection sent successfully!", data: savedConnectionRequestData })
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})

module.exports = requestRouter