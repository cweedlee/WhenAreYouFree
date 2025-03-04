const Event = require("../models/Event");
const utils = require("../utils");

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

// update Event ; exclude eventCode, participants, created
async function updateEvent(data, eventCode, session) {
  let event = await utils.getByEventCode(eventCode);
  const updated = {
    eventName: data.eventName || event.eventName,
    durationStart: data.durationStart
      ? new Date(data.durationStart)
      : event.durationStart,
    durationEnd: data.durationEnd
      ? new Date(data.durationEnd)
      : event.durationEnd,
    isConfirmed: data.isConfirmed || event.isConfirmed,
    participants: event.participants,
    eventCode: event.eventCode,
    host: data.host || event.host,
    updated: new Date(),
    created: event.created,
  };
  await Event.updateOne({ _id: event._id }, updated, { session }).catch(
    (err) => {
      console.log("Event update fail, error", err);
      throw new Error("500 Event update fail");
    }
  );
}

module.exports = { createEvent, updateEvent };
