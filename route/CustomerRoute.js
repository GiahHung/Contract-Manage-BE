const express = require("express");
let router = express.Router();
const CustomerController = require("../controller/CustomerController");
const validateToken = require("../middleware/validateToken");
const AuthorizeRoles = require("../middleware/AuthorizeRoles");
let initCustomerRouter = (app) => {
  router.get(
    "/api/customer/get-list-customer",
    validateToken,
    AuthorizeRoles(1,2),
    CustomerController.getListCustomer
  );
  router.post(
    "/api/customer/create-customer",
    validateToken,
    AuthorizeRoles(1,2),
    CustomerController.createCustomer
  );
  router.put(
    "/api/customer/edit-customer",
    validateToken,
    AuthorizeRoles(1,2),
    CustomerController.editCustomer
  );
  router.delete(
    "/api/customer/delete-customer",
    validateToken,
    AuthorizeRoles(1,2),
    CustomerController.deleteCustomer
  );
  router.get(
    "/api/customer/get-all-customer-with-page",
    validateToken,
    AuthorizeRoles(1,2),
    CustomerController.getAllCustomerWithPage
  );

  return app.use("/", router);
};

module.exports = initCustomerRouter;
