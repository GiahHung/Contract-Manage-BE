const CustomerService = require("../service/CustomerService");

let getListCustomer = async (req, res) => {
  try {
    let data = await CustomerService.getListCustomerService();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let createCustomer = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters",
      });
    }
    let data = await CustomerService.createCustomerService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let editCustomer = async (req, res) => {
  try {
    let data = await CustomerService.editCustomerService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let deleteCustomer = async (req, res) => {
  try {
    let message = await CustomerService.deleteCustomer(req.query.id);
    return res.status(200).json(message);
  } catch (error) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllCustomerWithPage = async (req, res) => {
  try {
    const { page, limit, sortField, sortOrder } = req.query;
    const message = await CustomerService.getCustomerWithPage(
      +page,
      +limit,
      sortField,
      sortOrder
    );
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  getListCustomer: getListCustomer,
  createCustomer: createCustomer,
  editCustomer: editCustomer,
  deleteCustomer: deleteCustomer,
  getAllCustomerWithPage: getAllCustomerWithPage,
};
