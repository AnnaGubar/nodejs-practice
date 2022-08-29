const { model, Schema } = require("mongoose");

const userSchema = Schema(
  {
    userName: String,
    userPassword: String,
    userRoles: [{ 
      type: String,
      ref: "role",
    }],
    userEmail: {
      type: String,
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    hobbies: [],
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("user", userSchema);
