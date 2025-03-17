const User = require("../models/User");

async function createUser(data, authority, eventId, session) {
  console.log(data);
  if (authority === "guest") {
    if (await User.findOne({ username: data.username })) {
      throw new Error("409 Username already exists");
    }
  }
  const user = new User({
    username: data.username,
    email: data.email,
    password: data.password,
    eventId: eventId,
    eventCode: data.eventCode,
    authority: authority,
  });
  await user.save({ session }).catch(() => {
    throw new Error("500 User create fail");
  });
  return user;
}

async function updateUser(data, userId) {
  const user = await User.findById(userId);
  const updated = {
    username: data.username || user.username,
    email: data.email || user.email,
    password: data.password || user.password,
    eventCode: data.eventcode || user.eventId,
    authority: data.authority || user.authority,
  };
  await Event.updateOne({ _id: user._id }, updated, { session }).catch(
    (err) => {
      console.log("User update fail, error", err);
      throw new Error("500 User update fail");
    }
  );
  return user;
}

async function updateEventCode(user, eventCode, eventId, session) {
  user.eventCode = eventCode;
  user.eventId = eventId;
  await User.updateOne({ _id: user._id }, user, { session }).catch((err) => {
    console.log("User update fail, error", err);
    throw new Error("500 User update fail");
  });
  return user;
}

async function getUserById(userId) {
  return await User.findById(userId).catch((err) => {
    console.log("User not found, error", err);
    throw new Error("404 User not found");
  });
}

async function getParticipantsByEvent(eventId) {
  console.log(eventId);
  const users = await User.find({ eventId: eventId }).catch((err) => {
    console.log("Participants not found, error", err);
    throw new Error("404 Participants not found");
  });
  return users.map((user) => {
    return {
      username: user.username,
      email: user.email,
      authority: user.authority,
    };
  });
}

module.exports = {
  createUser,
  updateUser,
  updateEventCode,
  getUserById,
  getParticipantsByEvent,
};
