require('dotenv').config({
  path: '.env'
});
const express = require("express");
const mongoose = require("mongoose");
const contactRouter = require("./api/routes/contactRoutes");
const app = express();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use('/contact', contactRouter);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});

app.use(express.json());

module.exports = app;