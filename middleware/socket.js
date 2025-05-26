// socket.js
require("dotenv").config(); 
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
    },
  });

  // Middleware xác thực token trước handshake
  io.use((socket, next) => {
    // console.log("Handshake auth payload:", socket.handshake.auth);
    const token = socket.handshake.auth.token;
    if (!token) {
      // console.log("⚠️ Token missing");
      return next(new Error("Authentication error: Token missing"));
    }

    jwt.verify(token, process.env.SECRET_JWT, (err, payload) => {
      if (err) {
        console.log("⚠️ Invalid token:", err.message);
        return next(new Error("Authentication error: Invalid token"));
      }
      socket.data.user = { id: payload.id, role: payload.role };
      next();
    });
  });

  io.on("connection", (socket) => {
    console.log(
      "✅ WS connection established — socket id:",
      socket.id,
      "user:",
      socket.data.user
    );

    const userId = socket.data.user.id;
    socket.join(`user_${userId}`);
    console.log(`→ Joined room user_${userId}`);

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", socket.id, "reason:", reason);
    });
  });

  return io;
}

function getIO() {
  if (!io) throw new Error("Socket.IO not initialized!");
  return io;
}

module.exports = { initSocket, getIO };

