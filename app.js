const name = "Namaste NodeJS"
const { sum, multiply } = require('./calculate'); // no need to add index.js, nodeJS handles it by default
console.log(name)
const util = require("node:util") // util module provided by NodeJS
console.log(util)
let a = 10
let b = 100
sum(a, b)
multiply(a, b)
// console.log(a + b);
