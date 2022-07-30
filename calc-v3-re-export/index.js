//* ⌨ node calc-v3 sum 2 3 4

const operations = require('./operations')

const [operation, ...args] = process.argv.slice(2);

const numbers = args.map((item) => Number(item));

module.exports = operations(operation, numbers);

