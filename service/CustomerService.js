const db = require("../models/index");

let getListCustomerService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Customer.findAll({
        attributes: ["id", "name", "email", "phone", "address"],
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createCustomerService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await db.Customer.findOne({
        where: { email: data.email },
      });
      if (customer) {
        resolve({
          errCode: 1,
          errMessage: "Email already exists",
        });
      } else {
        await db.Customer.create({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        });
        resolve({
          errCode: 0,
          errMessage: "Create customer successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let editCustomerService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 3,
          errMessage: "Missing required parameters",
        });
      }
      let customer = await db.Customer.findOne({
        where: { id: data.id },
      });
      if (customer) {
        customer.name = data.name;
        customer.email = data.email;
        customer.phone = data.phone;
        customer.address = data.address;

        await customer.save();
        resolve({
          errCode: 0,
          errMessage: "Update customer successfully",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Customer not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteCustomerService = (customerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!customerId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }
      let foundCustomer = await db.Customer.findOne({
        where: { id: customerId },
      });
      if (!foundCustomer) {
        resolve({
          errCode: 2,
          errMessage: "Customer not found",
        });
      }
      await db.Customer.destroy({
        where: { id: customerId },
      });
      resolve({
        errCode: 0,
        errMessage: "Delete customer successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getCustomerWithPage = (page, limit, sortField, sortOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const direction = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
      const allowedFields = ["id", "createdAt", "name"];
      const field = allowedFields.includes(sortField) ? sortField : "createdAt";
      let offset = (page - 1) * limit;
      let customers = await db.Customer.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [[field, direction]],
      });
      const totalItems = customers.count;
      const totalPages = Math.ceil(totalItems / limit);
      const customer = customers.rows;
      resolve({
        errCode: 0,
        errMessage: "Get all customer successfully",
        totalItems,
        totalPages,
        customer,
        currentPage: +page,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getListCustomerService: getListCustomerService,
  createCustomerService: createCustomerService,
  editCustomerService: editCustomerService,
  deleteCustomerService: deleteCustomerService,
  getCustomerWithPage: getCustomerWithPage,
};
