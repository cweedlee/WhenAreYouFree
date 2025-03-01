const express = require("express");
const router = express.Router();
const { createUser } = require("../services/userServices");
const generateEventCode = require("../utils/generateEventCode");
const { createEvent } = require("../services/eventServices");
const mongoose = require("mongoose");

// 새로운 이벤트 생성
router.post("", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const host = await createUser(data, "host", null, session);
    const eventCode = await generateEventCode(data.eventName);
    const event = await createEvent(data, host._id, eventCode, session);

    await session.commitTransaction();
    session.endSession();
    res
      .status(201)
      .json({ message: "Event: create success", eventCode: event.eventCode });
  } catch (error) {
    console.error("API 'event/post' failure : ", error);
    res
      .status(error.code || 500)
      .json({ message: error?.message || "API: Event: create fail" });
    await session.abortTransaction();
    session.endSession();
  }
});

module.exports = router;
