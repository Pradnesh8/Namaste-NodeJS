const http = require('https')
const fs = require('fs')
let a = 10
let b = 20

// offloads to Libuv
http.get('https://www.google.com', (res) => {
    console.log("API call")
})
// offloads to Libuv
setTimeout(() => {
    console.log("set timeout")
}, 3000)
// offloads to Libuv
fs.readFile('./polyfills.js', 'utf-8', (data) => {
    console.log("file data call");
})
// v8 runs synchronously
function multiply(x, y) {
    const result = x * y
    return result
}
// v8 runs synchronously
let c = multiply(a, b)
// after returning, result variable is garbage collected
console.log("sync", c);


// Call stack
// GEC
// a = 10 store in memory
// b = 20 store in memroy
// offload http api call to libuv
// offload settimeout to libuv
// offload readfile to libuv
// multiply func store in memory
// call multiply Function execution context created
// multiply function executed line by line
// FEC for multiply is removed
// result variable is garbage collected
// console logs C
// GEC pops out
// whichever Async function completes [order may vary]
// Callback of File Data
// Callback of API call
// Callback of setTimeout
// function ends
