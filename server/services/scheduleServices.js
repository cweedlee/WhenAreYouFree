const Schedule = require("../models/Schedule");

async function createSchedule(data, userId, eventId, username, session) {
  const newSchedule = new Schedule({
    userId: userId,
    eventId: eventId,
    username: username,
    scheduleStart: new Date(data.scheduleStart),
    scheduleEnd: new Date(data.scheduleEnd),
  });
  await newSchedule.save({ session }).catch((err) => {
    console.log("Schedule create fail, error", err);
    throw new Error("Schedule: create fail");
  });
  return newSchedule;
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
  const schedule = await Schedule.find({ eventId: eventId })
    .lean()
    .catch((err) => {
      console.log("Schedules not found, error", err);
      throw new Error("500 Schedules Server Error : find by event");
    });
  const data = schedule.reduce((acc, s) => {
    acc[s.userId] = { start: s.scheduleStart, end: s.scheduleEnd };
    return acc;
  }, {});
  return data;
}

module.exports = {
  createSchedule,
  getSchedulesByEvent,
  getSchedulesByUser,
  updateScheduleByUser,
  deleteScheduleByUser,
  getSchedulesByEventFormatted,
};
