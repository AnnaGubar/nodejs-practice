const operations = (operation, numbers) => {
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
      result = "Invalid operation";
      break;
  }

  console.log("⭐ ~ result:", result);
};

module.exports = operations;
