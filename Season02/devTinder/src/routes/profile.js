const express = require('express')
const { userAuth } = require('../middlewares/authHandler')
const { validateProfileEditData } = require('../utils/validation')
const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        validateProfileEditData(req)
        const loggedInUser = req.user
        Object.keys(req.body).forEach(key => {
            loggedInUser[key] = req.body[key];
        })
        await loggedInUser.save();
        res.send({ message: "User profile updated successfully", data: loggedInUser });
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

module.exports = profileRouter;