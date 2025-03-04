const mongoose = require("mongoose");

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

module.exports = mongoose.model("Event", EventSchema);
