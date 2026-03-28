require("dotenv").config();
const express = require("express");
const app = express();

const indexRouter = require("./routes/indexRouter");

const prisma = require("./lib/prisma");

app.use("/", indexRouter);

const PORT = 3030;

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`express port ${PORT}`);
});
