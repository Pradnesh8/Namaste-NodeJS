const crypto = require('crypto')

const fs = require('fs')
let a = 10
let b = 20


crypto.pbkdf2Sync("password", "50", 1000000, 100, 'sha512') //blocks main thread
console.log("Key generated synchronously")
// offloads to Libuv
setTimeout(() => {
    console.log("set timeout")
}, 3000) //only runs when main thread is empty (call stack is empty)
// Blocks the main thread, Sync operation
fs.readFileSync('./polyfills.js', 'utf-8')
// v8 runs synchronously
function multiply(x, y) {
    const result = x * y
    return result
}
// v8 runs synchronously
let c = multiply(a, b)
// after returning, result variable is garbage collected
console.log("sync", c);
