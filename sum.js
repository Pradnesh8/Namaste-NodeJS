console.log("SUM Executed")
function calculateSum(a, b) {
    console.log(a + b);
}
let x = "value"
z = 10// doesnt give error, runs in non-strict mode
// module.exports = calculateSum;
// to export multiple
module.exports = {
    x, calculateSum
}

