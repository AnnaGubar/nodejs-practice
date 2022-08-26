const express = require("express");
const cors = require("cors");
const { engine } = require("express-handlebars");
const sendEmail=require("./services/sendEmail")
require("colors");
require("../config/setEnvVars");

const connectDB = require("../config/db");

const { PORT } = process.env;
const app = express();

app.use(cors());

// запуск шаблонизатора
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./backend/views");

app.use(express.json());

// работа с формой
// postman -> body -> x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/v1", require("./routes/carsRoutes"));
app.use("/", require("./routes/usersRoutes"));

// работа с формой contact.handlebars
// http://localhost:5000/contact
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post("/send", async(req, res) => {
  // console.log(req.body); // получаем данные с формы
  await sendEmail(req.body);
  res.render("contact", { msg: "Form is sent" });
});
// примеры редиректов
app.get("/redir", (req, res) => {
  // res.redirect("contact");
  res.redirect("https://www.google.com/search");
});

/*
connectDB - асинхронная функция, вызвать можно тремя способами:
 - connectDB(argv).then().catch()
 - const start = async (argv) => {
    try { await invokeAction(argv);
    } catch (error) { console.log(error)}};
   start(argv);
 - (async()=>{ await invokeAction(argv)})() - функ. немедленного вызова
*/

// (async () => { await connectDB() })(); // подключение к БД
connectDB();

app.use("*", (req, res, _) => {
  res.status(404).json({ message: "Route is not found" });
});
app.use(require("./middlewares/errorHandler"));

app.listen(PORT, () => {
  console.log("Server is running".cyan.italic.underline);
});
