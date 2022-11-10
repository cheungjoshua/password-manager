const jwt = require("jsonwebtoken");

exports.models = function (req, res, next) {
  const token = req.header("access-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const isVerify = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = isVerify;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
