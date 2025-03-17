const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    username: user.username,
    userId: user._id,
    eventCode: user.eventCode,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1800s" });
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
  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
};

/////////

const check = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("401: No token");
  }
  const user = verifyToken(token);
  req.user = user;
  next();
};

const getToken = (req, res, next) => {
  // const token;
};

const create = (user) => {
  const token = generateToken(user);
  const refresh = generateRefresh();
  return { token, refresh };
};

module.exports = {
  check,
  create,
  verifyToken,
  verifyRefresh,
  getToken,
};
