const adminAuth = (req, res, next) => {
    const token = "SECRET";
    const isAuthorized = token === 'SECRET'
    if (!isAuthorized) {
        res.status(401).send("Unauthorized request")
    } else {
        next()
    }
}
const userAuth = (req, res, next) => {
    const token = "SECRET";
    const isAuthorized = token === 'SECRET'
    if (!isAuthorized) {
        res.status(401).send("Unauthorized request")
    } else {
        next()
    }
}

module.exports = {
    adminAuth,
    userAuth
}