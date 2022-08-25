const { model, Schema } = require("mongoose");

const userSchema = Schema(
  {
    userName: String,
    userPassword: String,
    userEmail: {
      type: String,
      unique: true,
    },
    token:{
      type: String,
      default: null,
    },
    hobbies: [],
    // userRoles: [],
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("user", userSchema);
