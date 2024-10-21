const express = require('express')
const connectDB = require('./config/database')
const app = express()
const cookieParser = require('cookie-parser')
// Express routers  to group the api
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
// using middleware to parse the JSON payloads
app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log("Successfully connected to DB")
    app.listen(7777, () => {
        console.log("Running server on port 7777")
    })
}, (err) => {
    console.log("Error while connecting to DB")
})

