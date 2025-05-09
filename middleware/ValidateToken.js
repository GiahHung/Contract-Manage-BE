const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        return;
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "Không có token" });
  }
};

module.exports = validateToken;
