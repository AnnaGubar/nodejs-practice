module.exports = (err, req, res, next) => {
  // console.log(process.env.NODE_ENV); // development
  // console.log(err.message); // Miss manufacterer field
  // console.log(res.statusCode); // 400
  // console.log(err.stack); // где случилась ошибка

  const statusCode = res.statusCode ? res.statusCode : 500;
  res.json({
    code:statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
