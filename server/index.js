const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("./routes/routes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const api = process.env.API_URL;
const db = process.env.DB_HOST;

app.use("/", userRouter);

const port = process.env.API_PORT || 3000;
mongoose
  .connect(db)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("An error occured", err));

app.listen(port, () => {
  console.log(`server runnig at port: ${port} and ${api}`);
});
