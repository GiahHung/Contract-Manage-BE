const express = require("express");
const bodyParser = require("body-parser");
const initUserRouter = require("./route/UserRoute");
const initContractRouter = require("./route/ContractRoute");
const initCustomerRouter = require("./route/CustomerRoute");
const connectDB = require("./config/connectDB");
const cors = require("cors");
require("dotenv").config();

let app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
initUserRouter(app);
initContractRouter(app);
initCustomerRouter(app);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("BackEnd NodeJs is running on port: " + port);
});
