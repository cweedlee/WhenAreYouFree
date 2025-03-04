const auth = '../utils/auth';

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("401: No token");
  }
  const user = auth.verifyToken(token);
  req.user = user;
  next();
};

const createAuth = (user) => {
  const token = auth.generateToken(user);
  const refresh = auth.generateRefresh();

  
}

const getToken = (req, res, next) => {
  const token 
}