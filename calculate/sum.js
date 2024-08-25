require("./xyz")
console.log("SUM Executed")
function sum(a, b) {
    console.log(a + b);
}
let x = "value"
z = 10// doesnt give error, runs in non-strict mode
module.exports = { sum };
// to export multiple
// module.exports = {
//     x, sum
// }

