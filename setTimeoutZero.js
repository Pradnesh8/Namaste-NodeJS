const crypto = require('crypto')
console.log("hello world")

setTimeout(() => {
    console.log("call setTimeout in 0 sec") // cannot run this until the call stack is empty (GEC must complete) then only it will be pushed onto call stack
}, 0)

crypto.pbkdf2Sync("password", "50", 5000000, 100, 'sha512') //blocks main thread
console.log("Key generated")
console.log("END LINE")