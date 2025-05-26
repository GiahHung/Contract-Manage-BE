const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.User.findOne({
        where: { email: userEmail },
        raw: false,
      });
      if (check) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let loginService = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let userData = {};
    let isExist = await checkEmail(email);
    try {
      if (!email || !password) {
        resolve({ errCode: 5, errMessage: "Missing parameter " });
      } else {
        if (isExist) {
          let user = await db.User.findOne({
            attributes: [
              "id",
              "email",
              "password",
              "name",
              "phone",
              "role",
              "createdAt",
            ],
            include: [
              {
                model: db.Role,
                as: "roleInfo",
                attributes: ["role_name"],
              },
            ],
            where: { email: email },
            raw: true,
          });
          if (user) {
            let check = bcrypt.compareSync(password, user.password);
            let isCorrect = user && check;
            const token =
              isCorrect &&
              jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.SECRET_JWT,
                {
                  expiresIn: "2h",
                }
              );
            if (check) {
              userData.errCode = 0;
              userData.errMessage = `Ok`;
              userData.token = token;
              delete user.password;
              userData.user = user;
            } else {
              userData.errCode = 3;
              userData.errMessage = `password wrong`;
            }
          } else {
            userData.errCode = 3;
            userData.errMessage = `User doesnt exist ?`;
          }
        } else {
          userData.errCode = 4;
          userData.errMessage = `Email wrong`;
        }
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createUserService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmail(inputData.email);
      if (check == true) {
        resolve({
          errCode: 3,
          errMessage: "Email is already in use",
        });
      } else {
        let hashPasswordFromBcrypt = await hashPassword(inputData.password);
        await db.User.create({
          name: inputData.name,
          phone: inputData.phone,
          email: inputData.email,
          password: hashPasswordFromBcrypt,
          role: inputData.role,
        });

        resolve({
          errCode: 0,
          errMessage: "Create success!!!",
        });
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map((e) => e.message);
        resolve({
          errCode: 2,
          errMessage: "Validation failed",
          errors: messages,
        });
      }

      console.error("Unexpected Error:", error);
      reject(error);
    }
  });
};
let getAllPageUsersService = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit;
      let { count, rows } = await db.User.findAndCountAll({
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Role,
            as: "roleInfo",
            attributes: ["role_name"],
          },
        ],
        offset: offset,
        limit: limit,
      });
      let totalPage = Math.ceil(count / limit);

      resolve({
        errCode: 0,
        errMessage: "Success!!!",
        total: count,
        totalPages: totalPage,
        data: rows,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsersService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      user = await db.User.findAll({
        attributes: {
          exclude: ["password", "role", "email"],
        },
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let editUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.name = data.name;
        user.phone = data.phone;
        user.role = data.role;

        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Success!!!!",
        });
      } else {
        resolve({
          errCode: 3,
          errMessage: "id isnt exist",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: userId },
      });
      if (!foundUser) {
        resolve({
          errCode: 2,
          message: "can not find user",
        });
      }
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        message: "delete success!!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getListRoleService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Role.findAll({
        attributes: ["id", "role_name"],
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

module.exports = {
  loginService: loginService,
  createUserService: createUserService,
  deleteUser: deleteUser,
  editUserService: editUserService,
  getAllUsersService: getAllUsersService,
  getAllPageUsersService: getAllPageUsersService,
  getListRoleService: getListRoleService,
};
