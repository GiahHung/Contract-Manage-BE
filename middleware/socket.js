// socket.js
const { Server } = require("socket.io");
let ioInstance;

function initSocket(server) {
  ioInstance = new Server(server, {
    cors: { origin: "http://localhost:3000" },
  });
  return ioInstance;
}

function getIO() {
  if (!ioInstance) throw new Error("Socket.IO not initialized!");
  return ioInstance;
}

module.exports = { initSocket, getIO };
