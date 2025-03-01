const Event = require("../models/Event");

async function createEvent(data, hostId, eventCode, session) {
  const newEvent = new Event({
    eventName: data.eventName,
    host: hostId,
    durationStart: new Date(data.durationStart),
    durationEnd: new Date(data.durationEnd),
    isConfirmed: false,
    eventCode: eventCode,
    participants: [hostId],
    created: new Date(),
    updated: new Date(),
  });
  await newEvent.save({ session }).catch((err) => {
    throw new Error("Event: create fail");
  });
  return newEvent;
}

module.exports = { createEvent };
