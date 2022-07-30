const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

// console.log(__dirname) // D:\Education\nodejs-practice\filesApp
// console.log(__filename) // D:\Education\nodejs-practice\filesApp\index.js

const dataFilePath = path.join(__dirname, "data", "data.json");

class Deases {
  constructor() {
    this.dease = {
      title: "Manky feaver",
      duration: "5 days",
      deaths: "1000",
    };
  }
  save = async () => {
    try {
      const deases = await this.getAll();
      const newDease = { ...this.dease, id: v4() };
      deases.push(newDease);

      await fs.writeFile(dataFilePath, JSON.stringify(deases,null,4));

      console.log(newDease);
      return newDease;
    } catch (error) {
      console.log(error);
    }
  };

  getAll = async () => {
    try {
      const data = await fs.readFile(dataFilePath);
      const deases = JSON.parse(data);

      console.log(deases);
      return deases;
    } catch (error) {
      console.log(error);
    }
  };

  update() {
    console.log("update");
  }

  remove() {
    console.log("remove");
  }
}

module.exports = new Deases();
