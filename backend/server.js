const express = require("express");
require("colors");
require("../config/setEnvVars")

const connectDB = require("../config/db");

const { PORT } = process.env;
const app = express();

app.use(express.json())

// работа с формой
// postman -> body -> x-www-form-urlencoded
app.use(express.urlencoded({
  extended:false
}))

app.use("/api/v1", require("./routes/carsRoutes"))
app.use("/", require("./routes/usersRoutes"))

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
connectDB()

app.use("*",(req,res,_)=>{
  res.status(404).json({message:"Route is not found"})
})
app.use(require("./middlewares/errorHandler"))

app.listen(PORT, () => {
  console.log("Server is running".cyan.italic.underline);
});
