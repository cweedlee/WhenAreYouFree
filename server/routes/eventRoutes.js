const express = require("express");
const Event = require("../models/Event"); // Event 모델 가져오기
const router = express.Router();
const User = require("../models/User");

const BASE = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs62 = require("@multiformats/base-x")(BASE);

// 새로운 이벤트 생성
router.post("/create", async (req, res) => {
  try {
    const { eventName, username, durationStart, durationEnd } = req.body;
    console.log(req.body);

    console.log("host 생성");
    const host = new User({
      username: username,
      email: "test@gmail.com",
      password: "1234",
      eventId: null,
      authority: "host",
    });
    console.log("host", host);
    await host.save();
    console.log("host save");

    console.log("eventCode 생성");
    let unique = false;
    let eventCode = "";

    while (!unique) {
      console.log("while", eventName + Date.now().toString());
      eventCode = bs62
        .encode(Buffer.from(eventName + Date.now().toString()))
        .slice(3, 10);
      const isExist = await Event.findOne({ eventCode });
      if (!isExist) unique = true;
    }
    console.log("eventCode", eventCode);

    const newEvent = new Event({
      eventName,
      host: host._id,
      durationStart: new Date(),
      durationEnd: new Date(),
      isConfirmed: false,
      eventCode: eventCode,
      participants: [],
      created: new Date(),
      updated: new Date(),
    });
    console.log("new event", newEvent);
    await newEvent.save();
    console.log("save event");
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("이벤트 생성 실패:", error);
    res.status(500).json({ error: "이벤트 생성 실패!" });
  }
});

module.exports = router;
