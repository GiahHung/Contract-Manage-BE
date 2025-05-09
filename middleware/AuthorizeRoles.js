const AuthorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền truy cập tài nguyên này" });
    }
    next();
  };
};

module.exports = AuthorizeRoles;
