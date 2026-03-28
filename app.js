require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/index");

const prisma = require("./lib/prisma");

app.use("/", indexRouter);

const PORT = 3030;

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`express port ${PORT}`);
});
