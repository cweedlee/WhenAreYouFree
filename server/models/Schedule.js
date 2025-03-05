const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  scheduleStart: { type: Date, required: true },
  scheduleEnd: { type: Date, required: true },
});

module.exports =
  mongoose.model.Schedule || mongoose.model("Schedule", ScheduleSchema);
