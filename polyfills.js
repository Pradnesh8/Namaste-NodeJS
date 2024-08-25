Array.prototype.myMap = function (cb) {
    const res = []
    for (let i = 0; i < this.length; i++) {
        res.push(cb(this[i], i, this, this[i]))
    }
    return res
}
Array.prototype.myFilter = function (cb) {
    const res = []
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this, this[i])) res.push(this[i])
    }
    return res
}
Array.prototype.myReduce = function (cb, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < this.length; i++) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
    }
    return accumulator
}
const x = [1, 2, 3, 4]
let res = x.map(elem => elem * 2);
console.log(res)
res = x.myMap(elem => elem * 2);
console.log(res)
res = x.filter(elem => elem % 3 === 0);
console.log(res)
res = x.myFilter(elem => elem % 3 === 0);
console.log(res)
res = x.reduce((acc, curr) => {
    acc = acc + curr
    return acc
}, 0);
console.log(res)
res = x.myReduce((acc, curr) => {
    acc = acc + curr
    return acc
}, 0);
console.log(res)

Function.prototype.myCall = function (context = {}, ...args) {
    if (typeof this !== 'function') {
        throw new Error("Not a function")
    }
    context.fn = this
    // console.log(context.fn)
    context.fn(...args)
}
const sum = function () {
    console.log(this.a + this.b)
}
const obj = {
    a: 1,
    b: 2
}
console.log(sum.call(obj))
console.log(sum.myCall(obj))

Function.prototype.myApply = function (context = {}, args = []) {
    if (typeof this !== 'function') {
        throw new Error("Not a function")
    }
    if (!Array.isArray(args)) {
        throw new Error("arguments are not in array")
    }
    context.fn = this
    // console.log(context.fn)
    context.fn(...args)
}
const sum2 = function () {
    console.log(this.a + this.b)
}
const obj2 = {
    a: 10,
    b: 20
}
console.log(sum2.apply(obj2))
console.log(sum2.myApply(obj2))

Function.prototype.myBind = function (context = {}, ...args) {
    if (typeof this !== 'function') {
        throw new Error("Not a function")
    }
    context.fn = this
    return function (...newArgs) {
        return context.fn(...args, ...newArgs);
    }
}
const sum3 = function () {
    console.log(this.a + this.b)
}
const obj3 = {
    a: 100,
    b: 200
}

const sum3new = sum3.bind(obj3);
console.log(sum3new())

const sum3new2 = sum3.myBind(obj3);
console.log(sum3new2())