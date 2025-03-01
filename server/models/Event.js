const BASE = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const mongoose = require("mongoose");
const bs62 = require("@multiformats/base-x")(BASE);

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
  console.log("pre save");
  next();
});

module.exports = mongoose.model("Event", EventSchema);
