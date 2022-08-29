const asyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function (roles) {
  return asyncHandler(async function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    if (
      !(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      )
    ) {
      res.status(400);
      throw new Error("Token authorization was not sent.");
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      const findRole = decoded.roles.filter(role=>role === "ADMIN")
      console.log(" ~ role", findRole)
      if(!findRole){
        res.status(403);
        throw new Error("No admin rights.");
      }

      next();
    } catch (error) {
      res.status(403);
      throw new Error("Forbidden.");
    }
  });
};
