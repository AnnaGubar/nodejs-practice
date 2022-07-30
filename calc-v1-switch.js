//* ⌨ node calc-v1 anna=banan dana=fish
// console.log(process.argv)

//* ⌨ node calc-v1 sum 2 3 4
// const args = process.argv.slice(2)
const [operation, ...args] = process.argv.slice(2);
// console.log("⭐ ~ operation", operation) // sum
// console.log("⭐ ~ args", args) // [ '2', '3', '4' ]

const numbers = args.map((item) => Number(item));
// console.log("⭐ ~ numbers", numbers)

switch (operation) {
  case 'sum':
    const sum = numbers.reduce((total, el) => total + el, 0);
    console.log("⭐ ~ sum", sum); 
    break;
  case 'sub':
    const sub = numbers.reduce((total, el) => total - el);
    console.log("⭐ ~ sub", sub); 
    break;
  case 'mult':
    const mult = numbers.reduce((total, el) => total * el);
    console.log("⭐ ~ mult", mult); 
    break;
  case 'div':
    const div = numbers.reduce((total, el) => total / el);
    console.log("⭐ ~ div", div); 
    break;
  default:
    console.log('Invalid operation')
    break;
}