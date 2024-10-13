const express = require('express')
const { adminAuth, userAuth } = require('./middlewares/authHandler')
const app = express()

// HOW EXPRESS WORKS
// /route => Middleware chain (Functions/ logic will be called and then moved to next ) => Request handler (resolve the request with response)

// This middleware will handle all /admin request GET, POST, ....,etc. 
// If unauthorized, return error with 401 status
// if authorized, will move to request handler
app.use('/admin', adminAuth);

app.get("/admin/getAllUsers", (req, res) => {
    res.send("ALL USER DATA")
})

app.delete("/admin/deleteUser", (req, res) => {
    res.send("USER DELETED")
})

// HERE as user needs to login, we wont check the user Auth 
app.post("/user/login", (req, res, next) => {
    res.send("LOG IN")
})
// Here as user is trying to access the profile data, we must check the authrozation of user
app.get("/user/profile", userAuth, (req, res, next) => {
    res.send("USER PROFILE DATA")
})

app.use("/user2",
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


app.get("/throwError", (req, res) => {
    throw new Error("RANDOM ERROR")
})


// best way to write the middleware is that all the code should be wrapped under try catch block and error is handled in the catch block
app.get("/handledUser", (req, res) => {
    try {
        // logic to connect DB etc
        res.send("USER HANDLED")
    } catch (err) {
        // log the error in some file or log it in monitoring
        res.status(500).send("SPECIFIC MESSAGE")
    }
})

// Order of params matters, if err object is required in middleware we must use 4 params
// below middleware will capture any random error which is not handled in any of the above middlewares/request hanlders
// it gracefully handles error and hides unnecessary information from leaking
app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong")
    }
})
app.listen(7777, () => {
    console.log("Running server on port 7777")
})