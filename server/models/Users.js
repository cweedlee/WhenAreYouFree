const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true }, // hashing
  eventId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  authority: { type: "user" | "host" | "admin", default: "user" },
});

// 🔹 비밀번호 저장 전 해싱 처리
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hashpass(this.password, hash.genSalt(10));
  next();
});

module.exports = mongoose.model("User", UserSchema);
