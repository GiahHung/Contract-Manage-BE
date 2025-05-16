const express = require("express");
let router = express.Router();
const ContractController = require("../controller/ContractController");
const validateToken = require("../middleware/validateToken");
const AuthorizeRoles = require("../middleware/AuthorizeRoles");
let initContractRouter = (app) => {
  router.post(
    "/api/contract/create-contract",
    validateToken,
    AuthorizeRoles(1), 
    ContractController.createContract
  );
  router.get(
    "/api/contract/get-all-contract",
    validateToken,
    AuthorizeRoles(1), 
    ContractController.getAllContract
  );
  router.get(
    "/api/contract/get-list-payment",
    validateToken,
    ContractController.getListPayment
  );

  return app.use("/", router);
};

module.exports = initContractRouter;
