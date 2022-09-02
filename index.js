require('dotenv').config({
  path: '.env'
});
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const axios = require("axios").default;
axios.defaults.baseURL = 'http://localhost:3000/api';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './front/views'));

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

const apiContactRouter = require("./api/routes/contactRoutes");
const frontContactRouter = require("./front/routes/contactRoutes");
app.use('/api', apiContactRouter);
app.use('', frontContactRouter);


app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});

module.exports = app;