const Event = require("../models/Event");

const BASE = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs62 = require("@multiformats/base-x")(BASE);

async function generateEventCode(text) {
  try {
    let duplication = true;
    let eventCode = "";
    let cnt = 0;
    const length = 7;
    while (duplication && ++cnt < 100) {
      eventCode = bs62
        .encode(Buffer.from(text[0] + Math.random().toString()))
        .slice(3, length + 3);
      duplication = await Event.findOne({ eventCode });
      console.log("duplication", duplication, "eventCode", eventCode);
    }
    if (duplication) {
      throw new Error("500 generateEventCode error");
    }
    return eventCode;
  } catch (err) {
    throw new Error("500 generateEventCode error");
  }
}

module.exports = generateEventCode;
