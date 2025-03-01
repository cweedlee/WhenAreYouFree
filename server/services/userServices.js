const User = require("../models/User");

async function createUser(data, authority, eventId, session) {
  if (authority === "guest") {
    if (await User.findOne({ username })) {
      throw new Error({
        message: "User: create fail: duplication",
        errorCode: 409,
      });
    }
  }
  const user = new User({
    username: data.username,
    email: data.email,
    password: data.password,
    eventId: eventId,
    authority: authority,
  });
  await user.save({ session }).catch((err) => {
    throw new Error("User: create fail: ");
  });
  return user;
}

async function updateUserEvent(user, eventId) {
  user.eventId = eventId;
  await user.save();
}

async function updateUser(data, userId) {
  const user = await User.findById(userId);
  user = { ...user, ...data };
  await user.save();
  return user;
}

module.exports = { createUser, updateUserEvent, updateUser };
