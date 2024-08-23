// 'global' keyword use to get global object in NodeJS, its similar to 'window' keyword in JS
console.log(global)
// 'globalThis' is standard keyword introduce later, which points to 'global'
console.log(globalThis)
// globalThis is referenced from global
console.log(globalThis === global)

/**
Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Getter/Setter],
  btoa: [Getter/Setter],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  crypto: [Getter]
}
 */
// eg of crypto method, available from global object
console.log(globalThis.crypto.randomUUID())