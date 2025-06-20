const ContractService = require("../service/ContractService");

let createContract = async (req, res) => {
  try {
    const contractData = req.body;
    console.log("data", contractData);
    const message = await ContractService.createContract(contractData);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!!!",
    });
  }
};

let getAllContract = async (req, res) => {
  try {
    const { page, limit, sortField, sortOrder } = req.query;
    const message = await ContractService.getAllContractService(
      +page,
      +limit,
      sortField,
      sortOrder
    );
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!!!",
    });
  }
};

let getListPayment = async (req, res) => {
  try {
    const message = await ContractService.getListPaymentService();
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!!!",
    });
  }
};

let getNotification = async (req, res) => {
  try {
    const status = req.query.status;
    const data = await ContractService.getNotificationService(status);
    return res.status(200).json(data);
  } catch (error) {
    console.log("error from sever", error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let updateContract = (req,res) =>{
  try {
    const contractData = req.body;
    console.log("data", contractData);
    const message = ContractService.updateContractService(contractData);
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!!!",
    });
  }
}
module.exports = {
  createContract,
  getAllContract,
  getListPayment,
  getNotification,
  updateContract
};
