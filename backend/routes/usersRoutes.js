const { Router } = require("express");
const UserController = require("../controllers/Users");
const authMiddleware = require("../middlewares/authMiddleware");
const router = Router();

//localhost:5000/api/v1/users

router.get("/users", authMiddleware, UserController.getAllUsers);
router.post(
  "/registration",
  (req, res, next) => {
    console.log("Joi валидация");
    next();
  },
  UserController.registration
);
router.post("/login", UserController.login);
router.get("/logout", authMiddleware, UserController.logout);

module.exports = router;
