/**
 * Last line of the file.
 * nextTick
 * Promise
 * Timer expired
 * Error
 * File Reading CB
 * 2nd nextTick
 * setImmediate
 *  2nd setImmediate
 * 2nd timer
 */

const fs = require("fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("Promise").then(console.log);
// as there was error in file read, the call back was moved in queue so before executing the setImmediate, poll phase was executed
fs.readFile("./file1.txt", "utf8", (err, data) => {
    if (err) console.log(err.message);
    // Event-loop waits in Poll phase, once event-loop iteration is ended
    // so because of that, next phase which will execute after process.nextTick() will be the check phase (setImmediate) will be executed which has line16 also in queue
    // after that it executes timer phase (setTimeout)
    setTimeout(() => console.log("2nd timer"), 0);

    process.nextTick(() => console.log("2nd nextTick"));

    setImmediate(() => console.log(" 2nd setImmediate"));

    console.log("File Reading CB");
});
process.nextTick(() => console.log("nextTick"));

console.log("Last line of the file.");