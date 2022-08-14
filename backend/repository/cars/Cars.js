const modelCar = require("../../models/Car");

class Cars {
  async save(data) {
    try {
      return await modelCar.create({ ...data });
    } catch (error) {
      console.log(error.message.red);
    }
  }
  async getAll() {
    try {
      return await modelCar.find({});
    } catch (error) {
      console.log(error.message.red);
    }
  }
}

module.exports = new Cars();
