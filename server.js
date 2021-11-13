const express = require("express");
const app = express();
const PORT = 8081;

app.listen(PORT, (err) => {
  if (err) return console.log(`An error is discribed in this message: ${err}`);

  console.log(`----------- Всё ok ) ${PORT}`);
});

module.exports = app;
