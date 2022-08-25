const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

class UserController {
  registration = asyncHandler(async (req, res) => {
    // 1. получение данных от пользователя
    // 2. валидируем
    // 3. проверяем есть ли в базе
    // 4. если есть - оповещение "уже зарегестрирован"
    // 5. хешируем пароль
    // 6. сохраняем пользователя

    console.log("registration");

    const { userName, userEmail, userPassword } = req.body;
    if (!(userName && userEmail && userPassword)) {
      res.status(400);
      throw new Error("Аll fields must be filled");
    }

    const oldUser = await User.findOne({ userEmail });
    if (oldUser) {
      res.status(409);
      throw new Error("User already exists. Please login.");
      // redirect to login-page
    }

    const hashPassword = await bcrypt.hash(userPassword, 5);

    const candidate = await User.create({
      userName,
      userEmail,
      userPassword: hashPassword,
    });
    if (!candidate) {
      res.status(400);
      throw new Error("Registration error");
    }

    res.status(201).json({
      status: "success",
      code: 201,
      data: candidate,
    });
  });

  login = asyncHandler(async (req, res) => {
    // 1. получение данных от пользователя
    // 2. валидируем
    // 3. проверяем есть ли в базе
    // 4. если нет пользователя с userEmail - просим зарегестрироваться
    // 5. проверяем введенные данные с данными из БД
    // 6. если данные введенны не верно - оповещение "Логин/пароль не верны"
    // 7. если верно - генерируем токен

    console.log("authentication");

    const { userEmail, userPassword } = req.body;
    if (!(userEmail && userPassword)) {
      res.status(400);
      throw new Error("Аll fields must be filled.");
    }

    const candidate = await User.findOne({ userEmail });
    if (!candidate) {
      return res.status(404).json({ message: "Please register" });
      // redirect to register-page
    }
    if (
      !(
        candidate &&
        (await bcrypt.compare(userPassword, candidate.userPassword))
      )
    ) {
      res.status(400);
      throw new Error("Invalid login/password.");
    }

    const payload = {
      id: candidate._id,
      food: "pizza",
      drink: "beer",
    };

    candidate.token = this.generateToken(payload);
    candidate.hobbies = ["read", "play"];

    await candidate.save();

    // если не удалось сохранить в БД
    if (!candidate) {
      res.status(400);
      throw new Error("Login error.");
    }

    res.status(200).json({
      status: "Login success",
      code: 200,
      // token, // либо развернутый ответ ⬇
      data: {
        name: candidate.userName,
        email: candidate.userEmail,
        token: candidate.token,
      },
    });
  });

  logout = asyncHandler(async (req, res) => {
    // 1. Считываем req.user._id
    // 2. Ищем пользователя по id
    // 3. Обнуляем токен в БД

    console.log("logout");

    const { _id } = req.user;

    const candidate = await User.findById(_id);

    if (!candidate) {
      res.status(400);
      throw new Error("Logout error.");
    }

    candidate.token = null;

    await candidate.save();

    res.status(200).json({
      status: `Logout success with ${_id}`,
    });
  });

  getAllUsers = asyncHandler(async (req, res) => {
    console.log("All Users");

    const { _id } = req.user;

    const candidate = await User.findById(_id);

    if (!candidate.token) {
      res.status(401);
      throw new Error("Not authorized.");
    }

const users = await User.find({})

    res.status(200).json(users);
  });

  generateToken = (payload) => {
    return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
  };
}

module.exports = new UserController();
