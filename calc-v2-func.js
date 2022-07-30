//* ⌨ node calc-v2 sum 2 3 4

// const args = process.argv.slice(2)
const [operation, ...args] = process.argv.slice(2);
// console.log("⭐ ~ operation", operation) // sum
// console.log("⭐ ~ args", args) // [ '2', '3', '4' ]

const numbers = args.map((item) => Number(item));
// console.log("⭐ ~ numbers", numbers)

const setOperation = (operation, numbers) => {
  let result = null;

  switch (operation) {
    case "sum":
      result = numbers.reduce((total, el) => total + el, 0);
      break;
    case "sub":
      result = numbers.reduce((total, el) => total - el);
      break;
    case "mult":
      result = numbers.reduce((total, el) => total * el);
      break;
    case "div":
      result = numbers.reduce((total, el) => total / el);
      break;
    default:
      result = 'Invalid operation';
      break;
  }

  console.log("⭐ ~ result:", result);
};

setOperation(operation, numbers);
