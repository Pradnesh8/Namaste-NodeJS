const express = require('express')
const app = express()
// NOTE: ORDER OF THE ROUTES MATTER A LOT, SO KEEP THIS IN MIND WHILE DECLARING REQUEST HANDLERS
// Exploring routehandlers & how it matches the patterns
// will handle /xz, /xyz
app.get("/xy?z", (req, res) => {
    res.send("xy?z is working");
})
// will handle /xyz, /xyyyyyyyz
app.get("/xy+z", (req, res) => {
    res.send("xy+z is working");
})
// will handle /xyz, /xyyyyyyyz
app.get("/xy*z", (req, res) => {
    res.send("xy*z is working");
})
// will handle /xz, /xyxz
app.get("/x(yx)?z", (req, res) => {
    res.send("x(yx)?z is working");
})

// Exploring req.query
app.get("/users", (req, res) => {
    console.log("/users?userId=123&name=abc")
    console.log(req.query)//{ userId: '123',name:'abc' }
    res.send("Users data fetched successfully")
})
// Exploring req.params
app.get("/users/:userId/:name", (req, res) => {
    console.log("/users/:userId/:name")
    console.log(req.params)//{ userId: '123',name:'abc' }
    res.send("Users data fetched successfully")
})

app.post("/users", (req, res) => {
    res.send("Users data added successfully")
})

app.put("/users", (req, res) => {
    res.send("Users data updated successfully")
})

app.delete("/users", (req, res) => {
    res.send("Users data deleted successfully")
})


// Always keep / path at the end OR request will be always handled by this handler
app.use(
    "/", // PATH
    // Request handler
    (req, res) => {
        res.send("Welcome to devTinder server, No such route")
    }
)
app.listen(7777, () => {
    console.log("Running server on port 7777")
})