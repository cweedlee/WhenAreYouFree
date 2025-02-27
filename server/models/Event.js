const BASE = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

const mongoose = require("mongoose");
const bs62 = require("base-x")(BASE);

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  durationStart: { type: Date, required: true },
  durationEnd: { type: Date, required: true },
  isConfirmed: { type: Boolean, default: false },
  eventCode: { type: String, required: true, unique: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

// 이벤트 공유용 코드 생성
EventSchema.pre("save", async function (next) {
  if (this.eventCode) return next();

  let unique = false;
  let eventCode = "";

  while (!unique) {
    eventCode = bs62
      .encode(this.eventName + Date.now() + Math.random().toString.Slice(0, 3))
      .slice(3, 10);
    const isExist = await this.constructor.findOne({ eventCode });
    if (!isExist) unique = true;
  }
  this.eventCode = eventCode;
  next();
});

module.exports = mongoose.model("Event", EventSchema);
