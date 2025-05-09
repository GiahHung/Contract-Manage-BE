const express = require("express");
let router = express.Router();
const UserController = require("../controller/UserController");
const validateToken = require("../middleware/validateToken");
const AuthorizeRoles = require("../middleware/AuthorizeRoles");
let initWebRouter = (app) => {
  router.post(
    "/api/user/create",
    validateToken,
    AuthorizeRoles(1), // 1 là role admin (ví dụ)
    UserController.createUser
  );
  router.post("/api/user/login", UserController.login);
  router.get(
    "/api/user/get-all-user",
    validateToken,
    AuthorizeRoles(1),
    UserController.getAllUsers
  );
  router.put(
    "/api/user/edit-user",
    validateToken,
    AuthorizeRoles(1),
    UserController.editUser
  );
  router.delete(
    "/api/user/delete-user",
    validateToken,
    AuthorizeRoles(1),
    UserController.deleteUser
  );
  return app.use("/", router);
};

module.exports = initWebRouter;
