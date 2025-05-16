const UserService = require("../service/UserService");
let createUser = async (req, res) => {
  try {
    console.log(req.body);
    let message = await UserService.createUserService(req.body);
    console.log(message);
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
};
let login = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await UserService.loginService(email, password);
    return res.status(200).json({
      errCode: user.errCode,
      errMessage: user.errMessage,
      user: user ? user.user : {},
      token: user.token,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
};
let getAllUsers = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let user = await UserService.getAllPageUsersService(+page, +limit);
      return res.status(200).json({
        errCode: 0,
        errMessage: "Success!!!",
        user,
      });
    } else {
      let user = await UserService.getAllUsersService();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Success!!!",
        user,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
};
let editUser = async (req, res) => {
  try {
    let data = req.body;
    let message = await UserService.editUserService(data);
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
};

let deleteUser = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: 1,
        message: "Missing required parameter",
      });
    }
    let message = await UserService.deleteUser(req.query.id);
    return res.status(200).json(message);
  } catch (error) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
};

let getListRole = async (req, res) => {
  try {
    let data = await UserService.getListRoleService();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
}

module.exports = {
  createUser: createUser,
  login: login,
  deleteUser: deleteUser,
  editUser: editUser,
  getAllUsers: getAllUsers,
  getListRole: getListRole,
};
