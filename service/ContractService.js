const db = require("../models/index");
const { sequelize } = require("../models");
const { getIO } = require("../middleware/socket");
const createContract = async (contractData) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const manager = await db.User.findOne({
        where: { role: 3 },
        transaction: t,
      });
      if (!manager) {
        const err = new Error("No manager found for approval");
        err.errCode = 3;
        throw err;
      }
      const contract = await db.Contract.create(
        {
          contract_code: contractData.contract_code,
          customer: contractData.customer,
          employee_id: contractData.employee_id,
          type_id: contractData.type_id,
          money: contractData.money,
          title: contractData.title,
          start_date: contractData.start_date,
          end_date: contractData.end_date,
          signed_date: contractData.signed_date,
          filepath: contractData.filepath,
          manager_id: manager.id,
          status: "pending",
        },
        { transaction: t }
      );
      switch (String(contractData.type_id)) {
        case "1": // Labour
          await db.LabourContract.create(
            {
              contract_id: contract.id,
              position: contractData.position,
              work_hour: contractData.work_hour,
            },
            { transaction: t }
          );
          break;

        case "2":
          await db.ConstructionContract.create(
            {
              contract_id: contract.id,
              location: contractData.location,
            },
            { transaction: t }
          );
          break;

        case "3":
          await db.CommercialContract.create(
            {
              contract_id: contract.id,
              business_scope: contractData.business_scope,
              payment: contractData.payment,
            },
            { transaction: t }
          );
          break;
        default:
          const err = new Error("Invalid contract type");
          err.errCode = 2;
          throw err;
      }
      await db.ContractLog.create(
        {
          contract_id: contract.id,
          status: "pending",
          performed_by: manager.id,
          performed_at: new Date(),
          action: "Create new contract",
          created_by: contractData.employee_id,
        },
        { transaction: t }
      );
      const contractLog = await db.ContractLog.findAll({
        where: { contract_id: contract.id, status: "pending" },
        include: [
          {
            model: db.Contract,
            as: "contract",
            attributes: ["title", "filepath"],
          },
          // {
          //   model: db.User,
          //   as: "performer",
          //   attributes: ["firstName", "lastName"],
          // },
          // {
          //   model: db.User,
          //   as: "creator",
          //   attributes: ["firstName", "lastName"],
          // },
        ],
        transaction: t,
      });
      const io = getIO();
      io.to(`user_${manager.id}`).emit("newPendingContract", { contractLog });
      return { errCode: 0, errMessage: "Create contract successfully" };
    });

    return result;
  } catch (err) {
    if (err.errCode) {
      return { errCode: err.errCode, errMessage: err.message };
    }

    // Nếu không, là lỗi hệ thống (500)
    throw err;
  }
};

let getAllContractService = (page, limit, sortField, sortOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const offset = (page - 1) * limit;
      const direction = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
      const allowedFields = [
        "id",
        "createdAt",
        "start_date",
        "end_date",
        "money",
        "contract_code",
      ];
      const field = allowedFields.includes(sortField) ? sortField : "createdAt";
      const result = await db.Contract.findAndCountAll({
        limit,
        offset,
        order: [[field, direction]],
        include: [
          { model: db.LabourContract, as: "labourDetail", required: false },
          {
            model: db.ConstructionContract,
            as: "constructionDetail",
            required: false,
          },
          {
            model: db.CommercialContract,
            as: "commercialDetail",
            required: false,
          },
          { model: db.User, as: "employee", required: false },
        ],
      });

      const totalItems = result.count;
      const totalPages = Math.ceil(totalItems / limit);
      const data = result.rows;
      resolve({
        errCode: 0,
        errMessage: "Get all contracts successfully",
        totalItems,
        totalPages,
        data,
        currentPage: +page,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getListPaymentService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.Payment.findAll({
        attributes: ["id", "Payment_name"],
      });
      resolve({
        errCode: 0,
        errMessage: "Get all payments successfully",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getNotificationService = (status) => {
  return new Promise(async(resolve, reject) => {
    try {
      const data =await db.ContractLog.findAll({
        where: { status: status },
        include: [
          {
            model: db.Contract,
            as: "contract",
            attributes: ["title", "filepath"],
          },
        ],
      });
      resolve({
        errCode: 0,
        errMessage: "success",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createContract,
  getAllContractService,
  getListPaymentService,
  getNotificationService
};
