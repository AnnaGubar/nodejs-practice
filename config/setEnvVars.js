const dotenv = require("dotenv");

// Error: ENOENT: no such file or directory, open 'D:\Education\nodejs-practice\.env'
// необходимо создать путь к файлу .env
const path = require("path");
module.exports = dotenv.config({ path: path.join(__dirname, "..", "config", ".env") });