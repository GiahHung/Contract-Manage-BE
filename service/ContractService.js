const db = require("../models/index");
const { sequelize } = require("../models");
const createContract = async (contractData) => {
  const t = await sequelize.transaction();
  return new Promise(async (resolve, reject) => {
    try {
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
        },
        { transaction: t }
      );

      // 2. Tạo bản ghi chi tiết tuỳ loại hợp đồng
      switch (contractData.type_id) {
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

        case "2": // Construction
          await db.ConstructionContract.create(
            {
              contract_id: contract.id,
              location: contractData.location,
            },
            { transaction: t }
          );
          break;

        case "3": // Commercial
          await db.CommercialContract.create(
            {
              contract_id: contract.id,
              business_scope: contractData.business_scope,
              payment_id: contractData.payment_id,
            },
            { transaction: t }
          );
          break;

        default:
          resolve({
            errCode: 2,
            errMessage: "Invalid contract type",
          });
      }

      // 3. Commit nếu mọi thứ OK
      await t.commit();
      resolve({
        errCode: 0,
        errMessage: "Create contract successfully",
      });
    } catch (e) {
      await t.rollback();
      reject(e);
    }
  });
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
        order: [[field,direction]],
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
      const contracts = result.rows;
      resolve({
        errCode: 0,
        errMessage: "Get all contracts successfully",
        totalItems,
        totalPages,
        contracts,
        currentPage: +page,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createContract,
  getAllContractService,
};
