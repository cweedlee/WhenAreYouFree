const router = require("express").Router();
const scheduleUtil = require("../utils/scheduleUtil");
const userUtil = require("../utils/userUtil");
const eventUtil = require("../utils/eventUtil");
router.get("/", async (req, res, next) => {
  const username = req.query?.username;
  console.log(username, req.cookies);
  res.status(200).end();
  next();
});

router.post("/", async (req, res, next) => {
  try {
    const username = req.query?.username;
    console.log(username, req.cookies);
    const user = await userUtil.getUserByUsername(username);
    const eventId = user.eventId;
    const event = await eventUtil.getEventById(eventId);
    const schedule = req.body.schedule;

    //create schedule
    const new_schedule = await scheduleUtil.createSchedule(
      schedule,
      user._id,
      event,
      username,
      req.session
    );
    res.status(200).end();
    next();
  } catch (err) {
    next(err);
  }
});
