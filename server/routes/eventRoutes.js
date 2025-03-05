const express = require("express");
const router = express.Router();
const userUtil = require("../services/userServices");
const { createEvent, updateEvent } = require("../services/eventServices");
const scheduleUtil = require("../services/scheduleServices");
const utils = require("../utils");
const { eventNames } = require("../models/User");

// 새로운 이벤트 생성
router.post("", async (req, res, next) => {
  try {
    utils.checkContentType(req, "application/x-www-form-urlencoded");
    const data = req.body;
    console.log(data);
    const session = req.session;
    const host = await userUtil.createUser(data, "host", null, session);
    const eventCode = await utils.generateEventCode(data.eventName);
    const event = await createEvent(data, host._id, eventCode, session);
    await userUtil.updateEventCode(host, eventCode, event._id, session);
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

router.get("", async (req, res, next) => {
  const eventCode = req?.query?.eventCode;
  console.log(eventCode);
  try {
    const event = await utils.getByEventCode(eventCode);
    const participants = await scheduleUtil.getSchedulesByEventFormatted(
      event.host
    );
    const host = await userUtil.getUserById(event.host);
    res.status(200).json({
      event: {
        eventName: event.eventName,
        host: host.username,
        durationStart: event.durationStart,
        durationEnd: event.durationEnd,
        isConfirmed: event.isConfirmed,
        created: event.created,
        updated: event.updated,
        participants,
      },
    });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
