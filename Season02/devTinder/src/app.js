const express = require('express')
const app = express()

app.use("/user",
    // we can use N no. of middlewares / request handlers
    (req, res, next) => {
        console.log("Req handler1 called")
        // res.send("Req handler1")
        next() // moves the control to next middleware
        // run same way as JS code in call stack
        // if we use res.send and next then send will return response 
        // and control will move to next request handler/ middleware,
        // in that also if response is getting returned then error will be thrown at server console
    },
    (req, res, next) => {
        console.log("Req handler2 called")
        next();
        // In this case, as next is called before res.send, it will move to next middleware for execution,
        // once that is completed it will comeback here and execute further code
        res.send("Req handler2")
    },
    (req, res, next) => {
        console.log("Req handler3 called")
        res.send("Req handler3")
        // If we don't add next() it will not call the next middleware function
    },
    (req, res, next) => {
        console.log("Req handler3 called")
        res.send("Req handler3")
    },
)

// no route handler case
app.use("/nomiddleware",
    (req, res, next) => {
        console.log("Req handler1 called")
        next()
    },
    (req, res, next) => {
        console.log("Req handler2 called")
        next()
    },
    (req, res, next) => {
        console.log("Req handler3 called")
        next()
    },
) // will give Cannot GET /nomiddleware as there is no res.send or response is not handled, so it is basically not able to resolve the req

// different ways you can define request Handlers
// app.use("/route",rh1,rh2,[rh3,rh4],rh5)
// app.use("/route",rh1,[rh2,rh3,rh4],rh5)
// app.use("/route",[rh1,rh2,rh3,rh4,rh5])
// app.use("/route",rh1,rh2,rh3,rh4,rh5)
// all will work same 
app.listen(7777, () => {
    console.log("Running server on port 7777")
})