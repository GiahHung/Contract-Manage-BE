const express = require("express");
const bodyParser = require("body-parser");
const initUserRouter = require("./route/UserRoute");
const connectDB = require("./config/connectDB");
require("dotenv").config();
let app = express();
app.use(express.json());
let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("BackEnd NodeJs is running on port: " + port);
});



















const cors = require("cors");

app.use(
  cors({
    origin: process.env.URL_REACT,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

initUserRouter(app);

connectDB();