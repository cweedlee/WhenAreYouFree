const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const username = req.query?.username;
  console.log(username, req.cookies);
  res.status(200).end();
  next();
});
