const crypto = require('crypto')
console.log("hello world")

setTimeout(() => {
    console.log("call setTimeout in 0 sec") // cannot run this until the call stack is empty (GEC must complete) then only it will be pushed onto call stack
}, 0) // Tiemout runs after <timer>ms after call stack is empty
//  Node.js makes no guarantees about the exact timing of when callbacks will fire, nor of their ordering. 

crypto.pbkdf2Sync("password", "50", 5000000, 100, 'sha512') //blocks main thread
console.log("Key generated")
console.log("END LINE")