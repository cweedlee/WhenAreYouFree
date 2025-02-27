const express = require("express");
const Event = require("../models/Event"); // Event 모델 가져오기
const router = express.Router();

// 새로운 이벤트 생성
router.post("/create", async (req, res) => {
  try {
    const { eventName, host, durationStart, durationEnd } = req.body;
    const newEvent = new Event({
      eventName,
      host,
      durationStart,
      durationEnd,
      isConfirmed: false,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "이벤트 생성 실패!" });
  }
});

module.exports = router;
