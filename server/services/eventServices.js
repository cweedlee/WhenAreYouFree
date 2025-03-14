const Event = require("../models/Event");
const utils = require("../utils");

async function createEvent(data, hostId, eventCode, session) {
  if (start >= end) {
    throw new Error("400 Event: invalid date");
  }
  const newEvent = new Event({
    eventName: data.eventName,
    host: hostId,
    //Times are formatted to 0:00:00 and 23:59:59
    durationStart: new Date(data.durationStart).setHours(0, 0, 0, 0),
    durationEnd: new Date(data.durationEnd).setHours(23, 59, 59, 999),
    isConfirmed: false,
    eventCode: eventCode,
    participants: [hostId],
    created: new Date(),
    updated: new Date(),
  });
  await newEvent.save({ session }).catch((err) => {
    console.log("Event create fail, error", err);
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

async function getParticipants(eventId) {
  const paricipants = User.find({ eventId: eventId }).catch((err) => {
    console.log("Participants not found, error", err);
    throw new Error("404 Participants not found");
  });
  return paricipants;
}

async function getEventIdByEventCode(eventCode) {
  const event = await Event.findOne({ eventCode: eventCode }).catch((err) => {
    console.log("Event not found, error", err);
    throw new Error("404 Event not found");
  });
  return event._id;
}
async function getEventByEventCode(eventCode) {
  const event = await Event.findOne({ eventCode: eventCode }).catch((err) => {
    console.log("Event not found, error", err);
    throw new Error("404 Event not found");
  });
  return event;
}

module.exports = {
  createEvent,
  updateEvent,
  getParticipants,
  getEventIdByEventCode,
  getEventByEventCode,
};
