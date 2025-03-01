const Event = require("../models/Event");

const BASE = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs62 = require("@multiformats/base-x")(BASE);

async function generateEventCode(text) {
  try {
    let duplication = true;
    let eventCode = "";
    const length = 7;
    while (duplication) {
      eventCode = bs62
        .encode(Buffer.from(text[0] + Math.random().toString()))
        .slice(3, length + 3);
      duplication = await Event.findOne({ eventCode });
      console.log("duplication", duplication, "eventCode", eventCode);
    }
    return eventCode;
  } catch (err) {
    throw new Error("Utils: generateEventCode error");
  }
}

module.exports = generateEventCode;
