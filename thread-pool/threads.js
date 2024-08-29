const crypto = require('crypto')


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
// it will run 4 methods concurrently and print 4 results at same time
// but 1 method result will print after sometime after 4 results are printed