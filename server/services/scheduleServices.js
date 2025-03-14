const { startSession } = require("../models/Event");
const Schedule = require("../models/Schedule");

async function createSchedule(text, userId, eventId, username, session) {
  const data = JSON.parse(text);
  let start, end;
  try {
    data.map(async (d) => {
      start = new Date(d.start);
      end = new Date(d.end);
      console.log(d);
      console.log(start, typeof start);
      const newSchedule = new Schedule({
        userId: userId,
        eventId: eventId,
        username: username,
        scheduleStart: start,
        scheduleEnd: end,
      });
      await newSchedule.save({ session }).catch((err) => {
        console.log("Schedule create fail, error", err);
        throw new Error("500 Schedule: create fail");
      });
    });
  } catch (error) {
    throw new Error("400 Schedule: create fail");
  }
}

async function getSchedulesByEvent(eventId) {
  return Schedule.find({ eventId: eventId })
    .lean()
    .catch((err) => {
      console.log("Schedules not found, error", err);
      throw new Error("500 Schedules Server Error : find by event");
    });
}

async function getSchedulesByUser(userId) {
  return Schedule.find({ userId: userId }).catch((err) => {
    console.log("Schedules not found, error", err);
    throw new Error("500 Schedules Server Error : find by user");
  });
}

async function updateScheduleByUser(userId, data) {
  await Schedule.updateOne({ userId: userId }, data).catch((err) => {
    console.log("Schedule update fail, error", err);
    throw new Error("500 Schedule update fail");
  });
}

async function deleteScheduleByUser(userId) {
  await Schedule.deleteOne({ userId: userId }).catch((err) => {
    console.log("Schedule delete fail, error", err);
    throw new Error("500 Schedule delete fail");
  });
}

async function getSchedulesByEventFormatted(eventId) {
  //1. get schedules by event
  const schedule = await Schedule.find({ eventId: eventId })
    .lean()
    .catch((err) => {
      console.log("Schedules not found, error", err);
      throw new Error("500 Schedules Server Error : find by event");
    });
  console.log(schedule);
  //2. format schedules
  return schedule.map((s) => ({
    start: s.scheduleStart,
    end: s.scheduleEnd,
    id: s._id,
    username: s.username,
  }));
}

module.exports = {
  createSchedule,
  getSchedulesByEvent,
  getSchedulesByUser,
  updateScheduleByUser,
  deleteScheduleByUser,
  getSchedulesByEventFormatted,
};
