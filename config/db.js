const { connect } = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const db = await connect(process.env.MONGODB_URI);
    console.log(`MongoDB is connected on HOST ${db.connection.host} on PORT ${db.connection.port} DB_NAME ${db.connection.name}`.bgGrey)
  } catch (error) {
    console.log(error.message.red);
  }
};

module.exports = connectDB;

