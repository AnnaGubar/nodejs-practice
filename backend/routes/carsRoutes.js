const { Router } = require("express");
const Cars = require("../controllers/Cars");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = Router();

// getAll
// getOne
// add
// update
// remove

//localhost:5000/api/v1/cars

router.post("/cars", authMiddleware, Cars.add);
// router.get("/cars", authMiddleware, Cars.getAll); // может получить только авторизированный

// роли: ADMIN, MODERATOR, USER, CUSTOMER, EDITOR
router.get("/cars", authMiddleware, roleMiddleware(["ADMIN", "EDITOR"]), Cars.getAll);

module.exports = router;
