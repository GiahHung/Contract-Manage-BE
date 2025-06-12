const express = require("express");
let router = express.Router();
const ContractController = require("../controller/ContractController");
const validateToken = require("../middleware/validateToken");
const AuthorizeRoles = require("../middleware/AuthorizeRoles");
let initContractRouter = (app) => {
  router.post(
    "/api/contract/create-contract",
    validateToken,
    AuthorizeRoles(1,4), 
    ContractController.createContract
  );
  router.get(
    "/api/contract/get-all-contract",
    validateToken,
    AuthorizeRoles(1,4,3), 
    ContractController.getAllContract
  );
  router.get(
    "/api/contract/get-list-payment",
    validateToken,
    AuthorizeRoles(1,4),
    ContractController.getListPayment
  );
  router.get(
    "/api/contract/get-notification",
    validateToken,
    AuthorizeRoles(1,4,3),
    ContractController.getNotification
  );
  router.put(
    "/api/contract/update-status-contract",
    validateToken,
    AuthorizeRoles(1, 4, 3),
    ContractController.updateContract
  );
  return app.use("/", router);
};

module.exports = initContractRouter;
