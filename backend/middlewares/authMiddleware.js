const asyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

module.exports = asyncHandler(async (req, res, next) => {
  // 1. Узнать какой метод запроса
  // 2. Считать токен с заголовка и Проверить что это токет авторизации
  // 3. Если токен не передали или это не токен авторизации - ошибка "Токен не тот"
  // 4. Парсим токен
  // 5. Передаем инфу с токена для дальнейших операций

  if (req.method === "OPTIONS") {
    next();
  }

  if (!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
    res.status(400);
    throw new Error("Token authorization was not sent.");
  }

  const token = req.headers.authorization.split(" ")[1];

  
  
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    
    // select("-userPassword") - забирает все кроме указанного поля
    const candidate = await User.findById(decoded.id).select(
      "-userPassword -updatedAt -createdAt"
    );

    // select("userPassword") - забирает только указанные поля
    // const candidate = await User.findById(decoded.id).select("userName userEmail token")

    if(!candidate){
      res.status(403);
      throw new Error("Forbidden.");
    }
  
    req.user = candidate;
    next();
    
  } catch (error) {
    res.status(403);
    throw new Error("Forbidden.");
  }

  


});
