require('dotenv').config({ path: '.env' });
const express = require("express");
const mongoose = require("mongoose");
// const Router = require("../routes")

const app = express();

app.use(express.json());

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});