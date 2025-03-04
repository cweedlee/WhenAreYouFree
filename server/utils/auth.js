const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    username: user.username,
    userId: user._id,
    eventCode: user.eventCode,
  };
  return {
    token: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1800s" }),
    refresh: jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "1d" }),
  };
};

const generateRefresh = () => {
  return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyRefresh = (refreshToken) => {
  jwt.verify(refreshToken, process.env.JWT_SECRET).catch((error) => {
    return false;
  });
  return true;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET).catch((error) => {
    return false;
  });
  return decoded;
};

module.exports = {
  generateToken,
  generateRefresh,
  isValidRefresh,
  verifyToken,
};
