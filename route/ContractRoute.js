const express = require("express");
let router = express.Router();
const ContractController = require("../controller/ContractController");
const validateToken = require("../middleware/validateToken");
const AuthorizeRoles = require("../middleware/AuthorizeRoles");
let initContractRouter = (app) => {
  router.post(
    "/api/contract/create-contract",
    validateToken,
    AuthorizeRoles(1), // 1 là role admin (ví dụ)
    ContractController.createContract
  );

  return app.use("/", router);
};

module.exports = initContractRouter;
