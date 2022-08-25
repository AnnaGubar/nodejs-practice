const modelCar = require("../../models/Car");

class Cars {
  async save(data,id) {
    try {
      return await modelCar.create({ ...data,user:id });
    } catch (error) {
      console.log(error.message.red);
    }
  }
  async getAll(id) {
    try {
      return await modelCar.find({user:id});
    } catch (error) {
      console.log(error.message.red);
    }
  }
}

module.exports = new Cars();
