const Event = require("../models/Event");

async function getByEventCode(eventCode) {
  if (!eventCode || eventCode.length !== 7) {
    throw new Error("400 Invalid eventCode");
  }
  const event = await Event.findOne({ eventCode });
  if (!event) {
    throw new Error("404 Event not found");
  }
  console.log(event);
  return event;
}

module.exports = { getByEventCode };
