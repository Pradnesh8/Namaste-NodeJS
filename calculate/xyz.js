function xyz() {
    console.log("require execution")
}
console.log("evaluated")
module.exports = { xyz }

// Require=>
// 1. Resolves the path
// 2. Reads the content according to file type
// 3. Wraps the content in IIFE
// 4. Evaluation - executed and returns module.exports
// 5. caching - caches the module