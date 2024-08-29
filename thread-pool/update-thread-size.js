const crypto = require('crypto')
// console.log(process.env)
// process.env.UV_THREADPOOL_SIZE = 8 set at environment level
// use set UV_THREADPOOL_SIZE=8 && node .\update-thread-size.js

crypto.pbkdf2('passwordCreate', '50', 500000, 100, "sha512", (err, key) => {
    console.log("1-key generated")
})

crypto.pbkdf2('passwordCreate', '50', 500000, 100, "sha512", (err, key) => {
    console.log("2-key generated")
})

crypto.pbkdf2('passwordCreate', '50', 500000, 100, "sha512", (err, key) => {
    console.log("3-key generated")
})

crypto.pbkdf2('passwordCreate', '50', 500000, 100, "sha512", (err, key) => {
    console.log("4-key generated")
})

crypto.pbkdf2('passwordCreate', '50', 500000, 100, "sha512", (err, key) => {
    console.log("5-key generated")
})

// By default size of thread pool is 4
// but as we updated set UV_THREADPOOL_SIZE=8, it can run 8 threads
// all 5 results are printed