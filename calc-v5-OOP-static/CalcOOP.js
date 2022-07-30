class CalcOOP {
  // constructor(operation, numbers) {
  //   this.operation = operation;
  //   this.numbers = numbers;
  // }

  static setOperations = (operation, numbers) => {
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

  static init = (operation, numbers) => {
    this.operation = operation;
    this.numbers = numbers;

    this.setOperations(this.operation, this.numbers);
  };
}

const [operation, ...args] = process.argv.slice(2);
const numbers = args.map((item) => Number(item));

module.exports = CalcOOP.init(operation, numbers);
