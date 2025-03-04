const express = require("express");
const router = express.Router();
const { createUser } = require("../services/userServices");
const { createEvent, updateEvent } = require("../services/eventServices");

const utils = require("../utils");

// 새로운 이벤트 생성
router.post("", async (req, res, next) => {
  try {
    utils.checkContentType(req, "application/x-www-form-urlencoded");
    const data = req.body;
    const session = req.session;
    const host = await createUser(data, "host", null, session);
    const eventCode = await utils.generateEventCode(data.eventName);
    const event = await createEvent(data, host._id, eventCode, session);

    res
      .status(201)
      .json({ message: "Event: create success", eventCode: event.eventCode });
    next();
  } catch (error) {
    next(error);
  }
});

// 이벤트 정보 수정
router.patch("", async (req, res, next) => {
  const eventCode = req?.query?.eventCode;
  try {
    utils.checkContentType(req, "application/x-www-form-urlencoded");
    await updateEvent(data, eventCode, req.session);

    res.status(200).json({ message: "Event: patch success" });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
