const asyncHandler = require("express-async-handler");
const repositoryCars = require("../repository/cars/Cars");

class Cars {
  add = asyncHandler(async (req, res) => {
    if (!req.body.manufacterer) {
      res.status(400);
      throw new Error("Miss manufacterer field");
    }

    const car = await repositoryCars.save(req.body,req.user._id);
    res.status(201).json({
      message: "Successes",
      code: 201,
      data: { car },
    });
  });

  async getAll(req, res) {
    console.log("getAll controller")
    try {
      const cars = await repositoryCars.getAll(req.user._id);
      res.status(200).json({
        message: "Successes",
        code: 200,
        data: {
          cars,
          quantity: cars.length,
        },
      });
    } catch (error) {
      console.log(error.message.red);
    }
  }

  getOne(req, res) {
    res.send("get a car");
  }
  update(req, res) {
    res.send("update a car");
  }
  remove(req, res) {
    res.send("remove a car");
  }
}

module.exports = new Cars();
