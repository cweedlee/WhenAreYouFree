const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, uniquie: true },
  password: { type: String, required: true }, // hashing
  eventId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  authority: { type: String, enum: ["user", "host", "admin"], default: "user" },
});

// 🔹 비밀번호 저장 전 해싱 처리
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
