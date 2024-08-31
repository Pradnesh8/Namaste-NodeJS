const http = require('node:http') // to indicate its the node in-built module we use node:
const server = http.createServer(function (req, res) {
    if (req.url === '/getData') {
        res.end('No data present')
    }
    res.end('Hello world')
}) // to create server using http module
server.listen(3000) // to listen on port

// As the methods used in http modules and the complexity to handle different scenarios is more.
// we use Express JS - web framework for Node.js