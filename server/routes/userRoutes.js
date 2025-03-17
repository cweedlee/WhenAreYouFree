const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const userUtil = require("../services/userServices");
const scheduleUtil = require("../services/scheduleServices");
const eventUtil = require("../services/eventServices");

router.get("", async (req, res, next) => {
  const username = req.query?.username;
  console.log(username, req.cookies);
  res.status(200).end();
  next();
});

router.get("/self", async (req, res, next) => {
  if (!req.user) {
    return next(Error("401 Unauthorized"));
  }
  const user = req.user;
  res.status(200).json(user);
  next();
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    console.log(req.body);
    if (!username || !password) {
      return next(Error("400 Invalid request"));
    }
    const user = await User.findOne({ username });
    if (!user || user === null) {
      return next(Error("404 User not found"));
    }
    console.log();
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(Error("401 Invalid credentials"));
    }
    const { token, refresh } = auth.create(user);
    console.log("code", user);
    res.setHeader("authorization", token);
    res.setHeader("refresh", refresh);
    //DEV
    res.cookie("authorization", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    res
      .status(200)
      .json({ message: "Login success", eventCode: user.eventCode })
      .end();
    next();
  } catch (err) {
    next(err);
  }
});

//회원가입
router.post("/register", async (req, res, next) => {
  try {
    //validation
    const { username, password, email } = req.body;
    if (!email || !password) {
      return next(Error("400 Invalid request"));
    }
    const eventCode = req.query?.eventCode;
    const event = await eventUtil.getEventByEventCode(eventCode);
    //create user
    const user = await userUtil.createUser(
      {
        username: username,
        password: password,
        email: email,
        eventCode: event.eventCode,
      },
      "guest",
      event._id,
      req.session
    );

    res.status(201).json({ message: "User: create success", user });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
