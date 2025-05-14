const ContractService = require("../service/ContractService");

let createContract = async (req, res) => {
  try {
    const contractData = req.body;
    console.log("data",contractData)
    const message = await ContractService.createContract(
      contractData
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

module.exports = {
    createContract,
  
}
