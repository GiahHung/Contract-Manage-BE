// app.js
const express = require("express");
const http = require("http");
const { initSocket } = require("./middleware/socket");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const initUserRouter = require("./route/UserRoute");
const initContractRouter = require("./route/ContractRoute");
const initCustomerRouter = require("./route/CustomerRoute");
const connectDB = require("./config/connectDB");

const app = express();

// Cấu hình CORS cho HTTP API
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

// Đăng ký route
initUserRouter(app);
initContractRouter(app);
initCustomerRouter(app);

// Kết nối DB
connectDB();

// Tạo HTTP server từ Express

// ...
const server = http.createServer(app);
initSocket(server);




module.exports = { server};

// Chạy server
const PORT = process.env.PORT || 6969;
server.listen(PORT, () => {
  console.log(`BackEnd NodeJs is running on port ${PORT}`);
});
